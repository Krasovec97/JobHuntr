import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import {LaravelReactI18nProvider} from "laravel-react-i18n";
import CookieBanner from "@/Components/CookieBanner";
import React from 'react';
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";

const appName = 'JobHuntr';

createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        // @ts-ignore
        resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
        setup: ({ App, props }) => {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let userLang = 'sl';

            switch (timeZone) {
                case 'Europe/Ljubljana':
                    userLang = 'sl';
                    break;
                default:
                    userLang = 'en';
                    break;
            }

            return (
                <LaravelReactI18nProvider
                    locale={userLang}
                    fallbackLocale={'en'}
                    //@ts-ignore
                    files={import.meta.glob('/lang/*.json')}>
                    <App {...props} />
                    <CookieBanner />
                </LaravelReactI18nProvider>
            )
        },
    }),
)
