const initPrompt = (
    siteName: string,
    siteDescription: string
) => `We are designing a website for ${siteDescription}. The company name is ${siteName}. The list of components we can use is Section, Carousel, Recent posts, Pricing, Featured items, Featured people and Image gallery.
Each component is good for displaying different types of things:
Section - shows a large title and image with a description and action buttons.
Carousel - shows a scrollable image one at a time.
Pricing - shows pricing plans and their descriptions.
Featured items - shows a few items with text descriptions.
Featured people - shows cards of people.
Image gallery - shows a list of images.
Each component has different fields it supports:
Section - title (required field, big headline text), subtitle (subtitle text), text (long form markdown text), actions (a list of buttons), media (required, an image description).
Carousel - title (required field, big headline text), subtitle (subtitle text), items (a list of featured items).
Featured item - title (required field, big headline text), subtitle (subtitle text), image (required, description used to search for an image).
Featured items - items (required field, a list of featured item)
Featured people - people (required field, list of people, each person contains a name, title and image)
Image gallery - images (required field, list of image descriptions)
For example, a response can look like this:

{
    "components": [
        {
            "type": "GenericSection",
            "title": {
                "text": "My large title"
            },
            "subtitle": "My smaller subtitle",
            "text": "My *markdown* text",
            "actions": [
                {
                    "label": "Action label",
                    "url": "Action url"
                }
            ],
            "media": "An image that represents this section"
        },
        {
            "type": "CarouselSection",
            "title": "Carousel title",
            "subtitle": "Carousel subtitle",
            "items": [
                {
                    "title": "Carousel item 1 title",
                    "subtitle": "Carousel item 1 subtitle",
                    "text": "markdown *text*",
                    "image": "image description for carousel item"
                },
                {
                    "title": "Carousel item 2 title",
                    "subtitle": "Carousel item 2 subtitle",
                    "text": "markdown *text*",
                    "image": "image description for carousel item"
                }
            ]
        },
        {
            "type": "PricingSection",
            "title": {
                "text": "Pricing title text"
            },
            "subtitle": "Pricing subtitle",   
            "plans": [
                {
                    "title": "Pricing plan 1 title",
                    "price": "Pricing plan 1 price"
                }
            ]
        },
        {
            "type": "FeaturedItemsSection",
            "title": {
                "text": "Section title text"
            },
            "subtitle": "Section subtitle",   
            "items": [
                {
                    "title": "Featured item 1 title",
                    "subtitle": "Featured item 1 subtitle",
                    "text": "Featured item 1 long markdown *text*",
                    "image": "image description for featured item 1"
                },
                {
                    "title": "Featured item 2 title",
                    "subtitle": "Featured item 2 subtitle",
                    "text": "Featured item 2 long markdown *text*",
                    "image": "image description for featured item 2"
                }
            ]
        },
        {
            "type": "FeaturedPeopleSection",
            "title": {
                "text": "Section title text"
            },
            "subtitle": "Section subtitle",   
            "people": [
                "content/data/team/Asher-Schmitt.json",
                "content/data/team/Drake-Garza.json",
            ]
        },
        {
            "type": "ImageGallery",
            "title": {
                "text": "Section title text"
            },
            "subtitle": "Section subtitle",   
            "images": [
                whale jumping out of the water",
                "man walking down the street at sunset",
                "three orange flowers",
            ]
        }
    ]
}


All images are represented by a clear description of what appears in them. Use as many images as possible.
Each page in the website is comprised of these components, try to use as many of them as possible to fit the purpose of the page.
I will ask you to design a page using these components. Return the a list of components I should use and what their field values should be. For each component include an additional field called "type" with its type. Return your response in JSON format and return nothing else. Don't include additional text except the JSON response. If you understand reply - "yes" and nothing else.`;

export default class ChatGPTClient {
    private client: any;
    private readonly apiKey: string;

    private parentMessageId: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async init(siteName: string, siteDescription: string) {
        const { ChatGPTAPI } = await import('chatgpt');
        this.client = new ChatGPTAPI({ apiKey: this.apiKey, fetch: require('node-fetch') });
        const result = await this.client.sendMessage(initPrompt(siteName, siteDescription));
        this.parentMessageId = result.id;
    }

    async getPage(title: string, description: string) {
        const result = await this.client.sendMessage(
            `create the page: ${title}. the description of the page: ${description}`,
            { parentMessageId: this.parentMessageId }
        );
        // console.log(result.text);
        const startIndex = result.text.indexOf('{');
        const endIndex = result.text.lastIndexOf('}');
        // console.log(result.text);
        return JSON.parse(result.text.substr(startIndex, endIndex - startIndex + 1));
    }
}
