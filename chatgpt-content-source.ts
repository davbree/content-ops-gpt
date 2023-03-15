import _ from 'lodash';

import {
    Asset,
    ContentChangeEvent,
    ContentSourceInterface,
    Document,
    Field,
    FieldSpecificProps,
    InitOptions,
    Locale,
    Model,
    ModelMap,
    UpdateOperation,
    UpdateOperationField,
    UpdateOperationListFieldItem,
    UpdateOperationModelField,
    ValidationError
} from '@stackbit/types';
import UnsplashClient from './unsplash-client';
import ChatGPTClient from './chatgpt-client';

type ChatGPTContentSourceOptions = {
    siteName: string;
    siteDescription: string;
    openAiApiKey: string;
    unsplashAccessKey: string;
    contentSource: ContentSourceInterface;
};

export default class ChatGPTContentSource implements ContentSourceInterface {
    private readonly innerContentSource: ContentSourceInterface;
    private readonly siteName: string;
    private readonly siteDescription: string;
    private readonly chatgpt: ChatGPTClient;
    private readonly unsplash: UnsplashClient;

    constructor(options: ChatGPTContentSourceOptions) {
        this.innerContentSource = options.contentSource;
        this.siteName = options.siteName;
        this.siteDescription = options.siteDescription;
        this.chatgpt = new ChatGPTClient(options.openAiApiKey);
        this.unsplash = new UnsplashClient(options.unsplashAccessKey);
    }
    getContentSourceType(): string {
        return this.innerContentSource.getContentSourceType();
    }
    getProjectId(): string {
        return this.innerContentSource.getProjectId();
    }
    getProjectEnvironment(): string {
        return this.innerContentSource.getProjectEnvironment();
    }
    getProjectManageUrl(): string {
        return this.innerContentSource.getProjectManageUrl();
    }
    async init(options: InitOptions): Promise<void> {
        await this.chatgpt.init(this.siteName, this.siteDescription);
        return this.innerContentSource.init(options);
    }
    reset(): Promise<void> {
        return this.innerContentSource.reset();
    }
    onWebhook?(data: { data: unknown; headers: Record<string, string> }): void {
        return this.innerContentSource.onWebhook?.(data);
    }
    onFilesChange?({
        updatedFiles
    }: {
        updatedFiles: string[];
    }): Promise<{ schemaChanged?: boolean; contentChangeEvent?: ContentChangeEvent<unknown, unknown> }> {
        return this.innerContentSource.onFilesChange?.({ updatedFiles });
    }
    startWatchingContentUpdates(options: {
        getModelMap: () => ModelMap;
        getDocument: ({ documentId }: { documentId: string }) => Document<unknown>;
        getAsset: ({ assetId }: { assetId: string }) => Asset<unknown>;
        onContentChange: (contentChangeEvent: ContentChangeEvent<unknown, unknown>) => Promise<void>;
        onSchemaChange: () => void;
    }): void {
        return this.innerContentSource.startWatchingContentUpdates(options);
    }
    stopWatchingContentUpdates(): void {
        return this.innerContentSource.stopWatchingContentUpdates();
    }
    getModels(): Promise<Model[]> {
        return this.innerContentSource.getModels();
    }
    getLocales(): Promise<Locale[]> {
        return this.innerContentSource.getLocales();
    }
    getDocuments(options: { modelMap: ModelMap }): Promise<Document<unknown>[]> {
        return this.innerContentSource.getDocuments(options);
    }
    getAssets(): Promise<Asset<unknown>[]> {
        return this.innerContentSource.getAssets();
    }
    hasAccess(options: {
        userContext?: unknown;
    }): Promise<{ hasConnection: boolean; hasPermissions: boolean }> {
        return this.innerContentSource.hasAccess(options);
    }
    private async convertFieldType(
        fieldValue: any,
        modelField: Field | FieldSpecificProps,
        modelMap: ModelMap
    ): Promise<UpdateOperationField> {
        switch (modelField.type) {
            case 'string':
            case 'slug':
            case 'text':
            case 'html':
            case 'url':
            case 'boolean':
            case 'number':
            case 'date':
            case 'datetime':
            case 'enum':
            case 'json':
            case 'style':
            case 'color':
            case 'markdown':
                return {
                    value: fieldValue,
                    type: modelField.type
                };
            case 'list':
                const itemsModel = modelField.items ?? { type: 'string' };
                const items: UpdateOperationListFieldItem[] = [];
                for (const item of fieldValue) {
                    const documentField = (await this.convertFieldType(
                        item,
                        itemsModel,
                        modelMap
                    )) as UpdateOperationListFieldItem;
                    if (documentField) {
                        items.push(documentField);
                    }
                }
                return {
                    type: 'list',
                    items
                };
            case 'object':
                return {
                    type: 'object',
                    fields: await this.convertFields(fieldValue, modelField.fields, modelMap)
                };
            case 'model':
                const { type, ...fields } = fieldValue;
                const modelType = type ?? modelField.models?.[0];
                const model = modelMap[modelType];
                if (!model) {
                    console.error('No model for type: ' + modelType, fieldValue); //TODO
                    return null;
                }
                if (model.name === 'ImageBlock' || modelField.models?.includes('ImageBlock')) {
                    return {
                        type: 'model',
                        modelName: 'ImageBlock',
                        fields: {
                            url: {
                                type: 'image',
                                value: await this.unsplash.getImage(fieldValue)
                            },
                            altText: {
                                type: 'string',
                                value: fieldValue
                            }
                        }
                    };
                }
                return {
                    type: 'model',
                    modelName: model.name,
                    fields: await this.convertFields(fields, model.fields ?? [], modelMap)
                };
            case 'reference':
                return {
                    type: 'reference',
                    refType: 'document',
                    refId: fieldValue
                };
            case 'image':
                return {
                    type: 'image',
                    value: this.unsplash.getImage(fieldValue)
                };
            // TODO file, richText ???
            default:
                throw new Error('Unsupported type: ' + modelField.type);
        }
    }
    private async convertFields(
        dataFields: Record<string, any>,
        modelFields: Field[],
        modelMap: ModelMap
    ): Promise<Record<string, UpdateOperationField>> {
        const result = {};
        for (const [fieldName, fieldValue] of Object.entries(dataFields)) {
            const modelField = (modelFields ?? []).find((modelField: Field) => modelField.name === fieldName);
            if (!modelField || _.isNil(fieldValue)) {
                continue;
            }
            const documentField = await this.convertFieldType(fieldValue, modelField, modelMap);
            if (documentField) {
                result[fieldName] = documentField;
            }
        }
        return result;
    }
    private async convertComponent(component: any, modelMap: ModelMap): Promise<UpdateOperationField> {
        const componentType = component.type;
        let normalizedType = _.startCase(componentType)
            .replace(/ /g, '')
            .replace(/\-/g, '')
            .replace(/_/g, '');
        if (normalizedType === 'Section') {
            normalizedType = 'GenericSection';
        } else if (!normalizedType.endsWith('section')) {
            normalizedType += 'Section';
        }
        const model = modelMap[componentType] || modelMap[normalizedType];
        console.log(model ? 'model found' : 'no model', componentType, normalizedType);
        if (!model) {
            return null;
        }
        const op: UpdateOperationModelField = {
            fields: await this.convertFields(component, model.fields, modelMap),
            modelName: model.name,
            type: 'model'
        };
        return op;
    }
    async createDocument(options: {
        updateOperationFields: Record<string, UpdateOperationField>;
        model: Model;
        modelMap: ModelMap;
        locale?: string;
        userContext?: unknown;
    }): Promise<Document<unknown>> {
        const { updateOperationFields, modelMap } = options;
        let title;
        const titleField = updateOperationFields['title'];
        if (titleField?.type === 'string') {
            title = titleField.value;
        }
        let description;
        const descriptionField = updateOperationFields['description'];
        if (descriptionField?.type === 'string') {
            description = descriptionField.value;
        }
        const generatedPage = await this.chatgpt.getPage(title, description);
        const ops: UpdateOperationField[] = (
            await Promise.all(
                (generatedPage.components || generatedPage.page?.components || [])
                    ?.map(async (component) => await this.convertComponent(component, modelMap))
                    .filter(Boolean)
            )
        ).filter(Boolean);
        // console.log(JSON.stringify(ops, null, 2));
        return this.innerContentSource.createDocument({
            ...options,
            updateOperationFields: {
                ...options.updateOperationFields,
                sections: {
                    type: 'list',
                    items: ops as UpdateOperationListFieldItem[]
                }
            }
        });
    }
    updateDocument(options: {
        document: Document<unknown>;
        operations: UpdateOperation[];
        modelMap: ModelMap;
        userContext?: unknown;
    }): Promise<Document<unknown>> {
        return this.innerContentSource.updateDocument(options);
    }
    deleteDocument(options: { document: Document<unknown>; userContext?: unknown }): Promise<void> {
        return this.innerContentSource.deleteDocument(options);
    }
    uploadAsset(options: {
        url?: string;
        base64?: string;
        fileName: string;
        mimeType: string;
        locale?: string;
        userContext?: unknown;
    }): Promise<Asset<unknown>> {
        return this.innerContentSource.uploadAsset(options);
    }
    validateDocuments(options: {
        documents: Document<unknown>[];
        assets: Asset<unknown>[];
        locale?: string;
        userContext?: unknown;
    }): Promise<{ errors: ValidationError[] }> {
        return this.innerContentSource.validateDocuments(options);
    }
    publishDocuments(options: {
        documents: Document<unknown>[];
        assets: Asset<unknown>[];
        userContext?: unknown;
    }): Promise<void> {
        return this.innerContentSource.publishDocuments(options);
    }
}
