import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    structuredData
}) => {
    const siteUrl = 'https://sahabakery.com';
    const defaultImage = `${siteUrl}/logo-transparent.png`;
    const fullTitle = title ? `${title} | Saha Bakery` : 'Saha Bakery | Best Bakery in Berhampore Since 1978';
    const canonical = canonicalUrl || window.location.href;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage || defaultImage} />
            <meta property="og:site_name" content="Saha Bakery" />

            {/* Twitter */}
            <meta property="twitter:card" content={twitterCard} />
            <meta property="twitter:url" content={canonical} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage || defaultImage} />

            {/* Additional SEO Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content="Saha Bakery" />

            {/* Geo Tags for Local SEO */}
            <meta name="geo.region" content="IN-WB" />
            <meta name="geo.placename" content="Berhampore" />
            <meta name="geo.position" content="24.1027;88.2535" />
            <meta name="ICBM" content="24.1027, 88.2535" />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
