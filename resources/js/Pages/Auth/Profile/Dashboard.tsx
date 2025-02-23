import React, {ReactElement, useState} from "react";
import MainLayout from "@/Layouts/MainLayout";
import UpdateUserProfile from "@/Pages/Auth/Profile/UpdateUserProfile";
import {UserData} from "@/Interfaces/SharedInterfaces";
import Resume from "@/Pages/Auth/Profile/Resume";
import PageSection from "@/Components/PageSection";
import {Head, usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import ApplicationHistory from "@/Pages/Auth/Profile/ApplicationHistory";
import DashboardContent from "@/Pages/Auth/Profile/DashboardContent";

interface PartInterface {
    name: string,
    component: ReactElement|null
}

const parts: PartInterface[] = [
    {
        name: "Dashboard",
        component: <DashboardContent />
    },
    {
        name: "Settings",
        component: <UpdateUserProfile />
    },
    {
        name: "Resume",
        component: <Resume />
    },
    {
        name: "My applications",
        component: <ApplicationHistory />
    }
]

export default function Dashboard() {
    const {t} = useLaravelReactI18n();
    const {user} = usePage<{ auth: { user: UserData } }>().props.auth;
    const [activePart, setActivePart] = useState(parts[0]);

    return (
        <MainLayout>
            <Head title={t("Dashboard")} />
            <PageSection className={'bg-white'}>
                <div className="row mb-4">
                    <h3 className="fw-bold">{t("Hello, :name!", {name: user.name})}</h3>
                    <small>{user.email}</small>
                </div>
                <div className="row mb-4 overflow-x-scroll">
                    {parts.map((part) => {
                        return (
                            <div className={`col-12 col-md-auto text-center my-2 my-md-0 ${activePart.name === part.name ? 'text-primary border-bottom border-primary fw-bold' : ''}`}
                                 onClick={() => setActivePart(part)}
                                 style={{cursor: 'pointer'}}>
                                <p>{t(part.name)}</p>
                            </div>
                        )
                    })}
                </div>

                {activePart.component}
            </PageSection>
        </MainLayout>
    )
}
