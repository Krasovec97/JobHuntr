import {Head} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import PageSection from "../Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../Components/FancyTitle";
import IconCard from "../Components/IconCard";
import React from "react";

export default function RemoteJobs() {
    const {t} = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title="Remote Jobs"/>

            <PageSection className={"bg-dark"}>
                <div className="row text-white text-center flex-column justify-content-center">
                    <div className="col-12 py-5">
                        <div className="col-12">
                            <img src="/img/online_worker.webp" alt="noimg" height={250}/>
                        </div>

                        <h1 className="fw-bold">
                            {t("Find your dream remote job")}
                        </h1>

                        <p>
                            {t("Do what you love to do - remotely!")}
                        </p>
                    </div>

                    <div className="col-12 mb-5">
                        <a className='btn btn-primary btn-lg me-4 text-white py-2 px-4 fw-bold' href="/jobs">{t("Start searching").toUpperCase()}</a>
                        {/*<a className='btn btn-outline-light' href="/register">{t("Register")}</a>*/}
                    </div>
                </div>
            </PageSection>

            <PageSection className={"bg-white"}>
                <FancyTitle heading={t("Work from anywhere").toUpperCase()} subtitle={t("Your remote job awaits")}/>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} icon={<i className=" fa-solid fa-globe fa-4x"></i>}
                                  heading={t("Worldwide Opportunities")}>
                            <p>{t("JobHuntr links companies offering remote positions with digital nomads, expanding your job search across borders.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} icon={<i className="fa-brands fa-searchengin fa-4x"></i>}
                                  heading={t("Effortless Job Search")}>
                            <p>{t("We've simplified the process to help you quickly discover and land the perfect remote job.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} icon={<i className="fa-solid fa-gauge-high fa-4x"></i>}
                                  heading={t("Swift Applications")}>
                            <p>{t("Our streamlined application process gets you closer to your dream remote job faster than ever.")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>

            <PageSection>
                <FancyTitle darkBg={true} heading={t("Remote work?").toUpperCase()} subtitle={t("Why choose")}/>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-clock fa-2x"></i>}
                                  heading={t("Flexibility")}>
                            <p>{t("Flexibility in terms of work hours and location. You can often set your own schedule and work from anywhere with an internet connection.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-arrow-trend-up fa-2x"></i>}
                                  heading={t("Increased Productivity")}>
                            <p>{t("Some people find that they are more productive when working remotely. Fewer workplace distractions and a personalized work environment can lead to better concentration and efficiency.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-shield-virus fa-2x"></i>}
                                  heading={t("Crisis Resilience")}>
                            <p>{t("Remote work proved essential during the COVID-19 pandemic. It allows businesses to maintain operations during crises, such as natural disasters or health emergencies.")}</p>
                        </IconCard>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-brands fa-pagelines fa-2x"></i>}
                                  heading={t("Reduced Environmental Impact")}>
                            <p>{t("Working remotely can reduce the carbon footprint associated with commuting, as well as the energy usage of office buildings.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-earth-europe fa-2x"></i>}
                                  heading={t("Expanded Job Opportunities")}>
                            <p>{t("Remote work allows people to access job opportunities that may not be available locally. This can be particularly beneficial for those in regions with limited job prospects in their field.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-scale-balanced fa-2x"></i>}
                                  heading={t("Improved Work-Life Balance")}>
                            <p>{t("Remote work can help employees achieve a better work-life balance. It eliminates the need for long commutes, which can save both time and money. This can reduce stress and improve overall well-being.")}</p>
                        </IconCard>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-piggy-bank fa-2x"></i>}
                                  heading={t("Cost Savings")}>
                            <p>{t("Remote work can lead to significant cost savings. You can save money on commuting, work attire, and even daily meals since you have the convenience of your own kitchen.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-computer fa-2x"></i>}
                                  heading={t("Personalized Workspace")}>
                            <p>{t("You have the freedom to create a workspace that suits your needs and preferences, making it more comfortable and motivating.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-heart fa-2x"></i>}
                                  heading={t("Better Health and Well-being")}>
                            <p>{t("With more control over your work environment, you can create a workspace that is comfortable and conducive to your health. You can set up an ergonomic workstation, control lighting, and reduce exposure to germs in a shared office space.")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>
        </MainLayout>
    );
}


