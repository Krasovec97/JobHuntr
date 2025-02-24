import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import React, {StrictMode} from "react";
import {LaravelReactI18nProvider} from "laravel-react-i18n";
import CookieBanner from "@/Components/CookieBanner";

createServer(page =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('./Pages/**/*.tsx')
            return pages[`./Pages/${name}.tsx`]
        },
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
                <StrictMode>
                    <LaravelReactI18nProvider
                        locale={userLang}
                        fallbackLocale={'en'}
                        //@ts-ignore
                        files={import.meta.glob('/lang/*.json')}>
                        <App {...props} />
                        <CookieBanner />
                    </LaravelReactI18nProvider>
                </StrictMode>
            )
        },
    }),
)
