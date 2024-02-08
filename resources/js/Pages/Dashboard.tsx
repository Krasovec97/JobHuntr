import { Head } from '@inertiajs/react';
import MainLayout from "../Layouts/MainLayout";
import PageSection from "./Parts/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {Alert} from "react-bootstrap";


export default function Dashboard({ user, hasVerifiedEmail }) {
    const {t} = useLaravelReactI18n();

    return (
            <MainLayout>
                <Head title="Dashboard" />

                <PageSection className={'bg-white'}>
                    { !hasVerifiedEmail && <Alert variant="primary">
                        <Alert.Heading>{t("Email not verified")}</Alert.Heading>
                        <p>{t("In order to gain access to all Remoter services and to apply to jobs with one click, please verify your email!")}</p>
                        </Alert> }

                    <div className="col-12">
                        {user.name}
                    </div>
                </PageSection>

            </MainLayout>
    );
}
