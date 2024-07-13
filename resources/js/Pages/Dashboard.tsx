import {Head, usePage} from '@inertiajs/react';
import MainLayout from "../Layouts/MainLayout";
import PageSection from "../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {Alert} from "react-bootstrap";
import UpdateUserProfile from "./Auth/UpdateUserProfile";
import React from 'react';
import {UserAuthProps} from "../Interfaces/SharedInterfaces";


interface PageProps {
    hasVerifiedEmail: boolean
}
export default function Dashboard({ hasVerifiedEmail }: PageProps) {
    const {t} = useLaravelReactI18n();
    const user = usePage<UserAuthProps>().props.auth.user;

    return (
            <MainLayout>
                <Head title="Dashboard" />

                <PageSection className={'bg-white full-h'}>
                    <div className="col-12 col-md-8 mx-auto">
                        { !hasVerifiedEmail && <Alert variant="primary">
                            <Alert.Heading>{t("Email not verified")}</Alert.Heading>
                            <p>{t("In order to gain access to all JobHuntr services and to apply to jobs with one click, please verify your email!")}</p>
                        </Alert> }
                    </div>

                    <div className="col-12">
                        <UpdateUserProfile {...user}/>
                    </div>
                </PageSection>

            </MainLayout>
    );
}
