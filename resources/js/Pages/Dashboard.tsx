import {Head, usePage} from '@inertiajs/react';
import MainLayout from "../Layouts/MainLayout";
import PageSection from "./Parts/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {Alert} from "react-bootstrap";
import UpdateUserProfile from "./Auth/UpdateUserProfile";


export default function Dashboard({ hasVerifiedEmail }) {
    const {t} = useLaravelReactI18n();
    const user = usePage().props.auth.user;

    return (
            <MainLayout>
                <Head title="Dashboard" />

                <PageSection className={'bg-white full-h'}>
                    <div className="col-8 mx-auto">
                        { !hasVerifiedEmail && <Alert variant="primary">
                            <Alert.Heading>{t("Email not verified")}</Alert.Heading>
                            <p>{t("In order to gain access to all Remoter services and to apply to jobs with one click, please verify your email!")}</p>
                        </Alert> }
                    </div>

                    <div className="col-12">
                        <UpdateUserProfile {...user}/>
                    </div>
                </PageSection>

            </MainLayout>
    );
}
