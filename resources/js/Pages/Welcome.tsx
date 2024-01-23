import {Head} from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout.tsx';
import PageSection from "./Parts/PageSection.tsx";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../Components/FancyTitle.tsx";
import IconCard from "../Components/IconCard.tsx";
import ContactForm from "./Parts/ContactForm.tsx";

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const {t} = useLaravelReactI18n();

    return (
        <GuestLayout>
            <Head title="Home"/>

            <PageSection background={"bg-image-main"}>
                <div className="row text-white vh-fill-90 flex-column justify-content-center">
                    <div>
                        <h4>{t("Do what you love to do").toUpperCase()}</h4>
                        <h1 className="my-3 fw-bold">{t("Find your dream remote job").toUpperCase()}</h1>
                        <p>{t("Remoter helps thousands of people find their remote jobs.")}</p>
                    </div>

                    <div className="mt-5">
                        <button className="btn btn-primary rounded-4 px-4">
                            {t("Start searching").toUpperCase()}
                        </button>

                        <button className="btn btn-outline-light rounded-4 ms-3 px-4">
                            {t("Register now").toUpperCase()}
                        </button>
                    </div>
                </div>
            </PageSection>

            <PageSection background={"bg-white"}>
                <FancyTitle heading={t("Remoter services").toUpperCase()} subtitle={t("What do we offer?")}/>

                <div className="row">
                    <div className="col-4">
                        <IconCard alignMiddle={true} icon={<i className=" fa-solid fa-globe fa-4x"></i>}
                                  heading={t("Our Mission")}>
                            <p>{t("Connecting companies that offer remote work, with digital nomads.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={true} icon={<i className="fa-brands fa-searchengin fa-4x"></i>}
                                  heading={t("Simplification")}>
                            <p>{t("Make it easier to find the perfect remote job for you, with Remoter Job-Search Technology (RJST®)")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={true} icon={<i className="fa-solid fa-gauge-high fa-4x"></i>}
                                  heading={t("Faster applications")}>
                            <p>{t("When registered to Remoter, you can apply to jobs that you find interesting in one click!")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>

            <PageSection>
                <FancyTitle darkBg={true} heading={t("Remote work?").toUpperCase()} subtitle={t("Why choose")}/>

                <div className="row">
                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-clock fa-2x"></i>}
                                  heading={t("Flexibility")}>
                            <p>{t("Flexibility in terms of work hours and location. You can often set your own schedule and work from anywhere with an internet connection.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-arrow-trend-up fa-2x"></i>}
                                  heading={t("Increased Productivity")}>
                            <p>{t("Some people find that they are more productive when working remotely. Fewer workplace distractions and a personalized work environment can lead to better concentration and efficiency.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-shield-virus fa-2x"></i>}
                                  heading={t("Crisis Resilience")}>
                            <p>{t("Remote work proved essential during the COVID-19 pandemic. It allows businesses to maintain operations during crises, such as natural disasters or health emergencies.")}</p>
                        </IconCard>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-brands fa-pagelines fa-2x"></i>}
                                  heading={t("Reduced Environmental Impact")}>
                            <p>{t("Working remotely can reduce the carbon footprint associated with commuting, as well as the energy usage of office buildings.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-earth-europe fa-2x"></i>}
                                  heading={t("Expanded Job Opportunities")}>
                            <p>{t("Remote work allows people to access job opportunities that may not be available locally. This can be particularly beneficial for those in regions with limited job prospects in their field.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-scale-balanced fa-2x"></i>}
                                  heading={t("Improved Work-Life Balance")}>
                            <p>{t("Remote work can help employees achieve a better work-life balance. It eliminates the need for long commutes, which can save both time and money. This can reduce stress and improve overall well-being.")}</p>
                        </IconCard>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-piggy-bank fa-2x"></i>}
                                  heading={t("Cost Savings")}>
                            <p>{t("Remote work can lead to significant cost savings. You can save money on commuting, work attire, and even daily meals since you have the convenience of your own kitchen.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-computer fa-2x"></i>}
                                  heading={t("Personalized Workspace")}>
                            <p>{t("You have the freedom to create a workspace that suits your needs and preferences, making it more comfortable and motivating.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-heart fa-2x"></i>}
                                  heading={t("Better Health and Well-being")}>
                            <p>{t("With more control over your work environment, you can create a workspace that is comfortable and conducive to your health. You can set up an ergonomic workstation, control lighting, and reduce exposure to germs in a shared office space.")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>

            <PageSection background={"bg-white"}>
                <FancyTitle darkBg={false} heading={t("Contact us")} subtitle={t("Need to know more?")} />

                <div className="col-9 mt-5 mx-auto">
                    <ContactForm />
                </div>
            </PageSection>
        </GuestLayout>
    );
}


