// noinspection JSIgnoredPromiseFromCall

import './bootstrap';
import '../scss/app.scss';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {LaravelReactI18nProvider} from "laravel-react-i18n";
import GlobalContext from "./Context/GlobalContext";
import React from 'react';

const appName = 'JobHuntr';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    //@ts-ignore
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        let userLang = navigator.language;

        root.render(
                <LaravelReactI18nProvider
                    locale={userLang}
                    fallbackLocale={'en'}
                    //@ts-ignore
                    files={import.meta.glob('/lang/*.json')}
                >
                    <GlobalContext>
                        <App {...props} />
                    </GlobalContext>

                </LaravelReactI18nProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
