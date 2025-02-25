import { createInertiaApp } from '@inertiajs/react'
import createServer from '@inertiajs/react/server'
import ReactDOMServer from 'react-dom/server'
import {LaravelReactI18nProvider} from "laravel-react-i18n";
import CookieBanner from "@/Components/CookieBanner";
import {route} from "ziggy-js";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";

const appName = 'JobHuntr';

createServer((page) => {
    globalThis.Ziggy = page.props.ziggy;

    return createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        // @ts-ignore
        resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
        setup: ({ App, props }) => {
            const Ziggy = {
                // Pull the Ziggy config off of the props.
                ...props.initialPage.props.ziggy,
                // Build the location, since there is
                // no window.location in Node.
                location: new URL(props.initialPage.props.ziggy.url),
            };

            global.route = (name, params, absolute, config = Ziggy) => route(name, params, absolute, config);

            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let userLang;

            switch (timeZone) {
                case 'Europe/Ljubljana':
                    userLang = 'sl';
                    break;
                default:
                    userLang = 'en';
                    break;
            }

            return <LaravelReactI18nProvider
                        locale={userLang}
                        fallbackLocale={'en'}
                        //@ts-ignore
                        files={import.meta.glob('/lang/*.json')}>
                            <App {...props} />
                            <CookieBanner />
                    </LaravelReactI18nProvider>

        },
        progress: {
            color: '#4B5563',
        }
    })
    }
)
