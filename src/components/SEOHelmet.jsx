// src/components/SEOHelmet.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

function SEOHelmet({ title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonical }) {
    // Valores por defecto
    const defaultTitle = "Nikers - Tu Tienda de Zapatillas Premium";
    const defaultDescription = "Descubre las últimas colecciones de zapatillas premium para hombres y mujeres. Envío rápido y seguro. ¡Encuentra tu par perfecto en Nikers!";
    const defaultKeywords = "zapatillas, sneakers, Nike, Jordan, adidas, Puma, calzado, moda, hombres, mujeres, tienda online, premium";
    const defaultOgImage = `${window.location.origin}/images/og-image.jpg`;
    const defaultOgUrl = window.location.href;

    return (
        <Helmet>
            <title>{title ? `${title} | Nikers` : defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            <meta property="og:title" content={ogTitle || title || defaultTitle} />
            <meta property="og:description" content={ogDescription || description || defaultDescription} />
            <meta property="og:image" content={ogImage || defaultOgImage} />
            <meta property="og:url" content={ogUrl || defaultOgUrl} />
            <meta property="og:type" content="website" />

            {canonical && <link rel="canonical" href={canonical} />}

            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charset="utf-8" />
            <meta name="author" content="Nikers Team" />
 
        </Helmet>
    );
}

export default SEOHelmet;