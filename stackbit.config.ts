import { GitContentSource } from '@stackbit/cms-git';
import { defineStackbitConfig } from '@stackbit/types';
import { allModels } from 'sources/local/models';
import ChatGPTContentSource from 'chatgpt-content-source';

export const config = defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    ssgName: 'nextjs',
    nodeVersion: '16',
    models: allModels,
    pagesDir: 'content/pages',
    dataDir: 'content/data',
    presetSource: {
        type: 'files',
        presetDirs: ['sources/local/presets']
    },
    contentSources: [
        new ChatGPTContentSource({
            siteName: 'Stackbit',
            siteDescription:
                'A startup focusing on creating a visual interface for your headless websites and apps. Edit content and launch pages quickly without relying on a developer, and have full flexibility for your code and tech stack. See it in action',
            openAiApiKey: process.env.OPENAI_API_KEY,
            unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
            contentSource: new GitContentSource({
                contentDirs: ['content/pages', 'content/data'],
                models: Object.values(allModels),
                rootPath: __dirname,
                assetsConfig: {
                    referenceType: 'static',
                    staticDir: 'public',
                    uploadDir: 'images',
                    publicPath: '/'
                }
            })
        })
    ],
    pageLayoutKey: 'type',
    styleObjectModelName: 'ThemeStyle'
});
export default config;
