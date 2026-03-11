export function JsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': 'https://dheerajrs.com/#website',
                url: 'https://dheerajrs.com',
                name: 'd-admin',
                description: 'AI-powered website builder. Generate, host, and edit vibe code using AI.',
                potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://dheerajrs.com/?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                },
            },
            {
                '@type': 'SoftwareApplication',
                '@id': 'https://dheerajrs.com/#app',
                name: 'd-admin-ai',
                url: 'https://dheerajrs.com',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web',
                description: 'Generate, host, and edit vibe code instantly using AI models like Gemini, Claude, and ChatGPT.',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
