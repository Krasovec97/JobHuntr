import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout.js';
import InputLabel from "../../Components/InputLabel";
import InputError from "../../Components/InputError";
import PageSection from "../../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../../Components/FancyTitle";
import React from 'react';


export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: ''
    });

    const {t} = useLaravelReactI18n();

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post('/login');
    }

    return (
        <MainLayout>
            <Head title={t("Login")} />

            <PageSection className={'full-h'}>
                <FancyTitle heading={t("Login")} subtitle={t("Welcome")} />
                <div className={"col-12 col-md-4 border p-4 rounded mx-auto shadow"}>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel value="Email"/>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-control"
                                autoComplete="username"
                                autoFocus={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel value="Password"/>

                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-control"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>
                        <div className={"col-12 text-center mt-4"}>
                            <button className={"btn btn-primary px-5"}>{t("Login")}</button>
                        </div>
                    </form>
                </div>
            </PageSection>
        </MainLayout>
    );
}
