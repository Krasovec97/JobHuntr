import { Head, Link, useForm } from '@inertiajs/react';
import {useEffect} from "react";
import MainLayout from '../../Layouts/MainLayout.js';
import InputLabel from "../../Components/InputLabel";
import TextInput from "../../Components/TextInput";
import InputError from "../../Components/InputError";
import PageSection from "../Parts/PageSection";
import PrimaryButton from "../../Components/PrimaryButton";
import Checkbox from "../../Components/Checkbox";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../../Components/FancyTitle";


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const {t} = useLaravelReactI18n();

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setData(values => ({
            ...values,
            [key]: value,
        }))
    }

    function submit(e) {
        e.preventDefault();
        post('/login');
    }

    return (
        <MainLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 text-success">{status}</div>}

            <PageSection className={'full-h'}>
                <FancyTitle heading={"Login"} subtitle={"Welcome"} />
                <div className={"col-4 border p-4 rounded mx-auto shadow"}>
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email"/>

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="form-control"
                                autoComplete="username"
                                isFocused={true}
                                onChange={handleChange}
                            />

                            <InputError message={errors.email} className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password"/>

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="form-control"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />

                            <InputError message={errors.password} className="mt-2"/>
                        </div>
                        <div className={"col-12 text-center mt-4"}>
                            <button className={"btn btn-primary px-5"}>{t("Login")}</button>
                        </div>

                        <div className="col-12 text-center my-2">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </PageSection>
        </MainLayout>
    );
}
