import React from "react";

interface ComponentProps {
    title: string;
    description: string;
    ogUrl: string;
}

export default function MetaTags({title, description, ogUrl}: ComponentProps) {
    return (
        <>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={ogUrl} />
            <meta property="og:image" content="https://jobhuntr.co/img/logo-main.webp" />
        </>
    )
}
