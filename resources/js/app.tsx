// noinspection JSIgnoredPromiseFromCall

import './bootstrap';
import '../scss/app.scss';

import {hydrateRoot} from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {LaravelReactI18nProvider} from "laravel-react-i18n";
import GlobalContext from "./Context/GlobalContext";
import React, {StrictMode} from 'react';
import CookieBanner from "./Components/CookieBanner";

const appName = 'JobHuntr';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    //@ts-ignore
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
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

        hydrateRoot(el,
            <StrictMode>
                <LaravelReactI18nProvider
                    locale={userLang}
                    fallbackLocale={'en'}
                    //@ts-ignore
                    files={import.meta.glob('/lang/*.json')}
                >
                    <GlobalContext>
                        <App {...props} />
                    </GlobalContext>
                    <CookieBanner />
                </LaravelReactI18nProvider>
            </StrictMode>
            )
    },
    progress: {
        color: '#4B5563',
    },
});
