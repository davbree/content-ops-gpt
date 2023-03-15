import _ from 'lodash';
import path from 'path';
import { createApi } from 'unsplash-js';

export default class UnsplashClient {
    private client: any;
    constructor(accessKey: string) {
        this.client = createApi({
            accessKey,
            fetch: require('node-fetch')
        });
    }

    async getImage(description: string): Promise<string | undefined> {
        if (!_.isEmpty(description)) {
            const normalizedDescription = path
                .basename(
                    (_.isObject(description) ? _.get(description, 'altText') : description)
                        ?.replace(/\-/g, ' ')
                        .replace(/_/g, ' ')
                )
                .split('.')[0];
            console.log('Unsplash:', description, normalizedDescription);
            const result = await this.client.search.getPhotos({
                query: normalizedDescription,
                page: 1,
                perPage: 10
            });
            const url = _.get(
                result,
                `response.results[${Math.floor(
                    Math.random() * result?.response?.results?.length ?? 0
                )}].urls.regular`
            );
            if (url) {
                console.log('Unsplash:', description, normalizedDescription, url);
                return url;
            }
        }
        const randomResult = await this.client.photos.getRandom({
            page: 1,
            perPage: 10
        });
        console.log('Unsplash fallback:', description, _.get(randomResult, 'response.urls.regular', null));
        return _.get(randomResult, 'response.urls.regular', null);
    }
}
