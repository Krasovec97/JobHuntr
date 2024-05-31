import {Head} from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout.tsx';
import PageSection from "./Parts/PageSection.tsx";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "../Components/FancyTitle.tsx";
import IconCard from "../Components/IconCard.tsx";
import ContactForm from "./Parts/ContactForm.tsx";
import {JobInterface} from "../Interfaces/SharedInterfaces";
import JobCard from "../Components/JobCard";

interface PageProps {
    newestJobs: Array<JobInterface>,
    draftedJobs: Array<JobInterface>,
}

export default function Welcome({newestJobs, draftedJobs}: PageProps) {
    const {t} = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title="Home"/>

            <PageSection className="bg-dark">
                <div className="row text-white text-center flex-column justify-content-center">
                    <div className="col-12 py-5">
                        <div className="col-12">
                            <img src="/img/job_seeker.webp" alt="noimg" height={250}/>
                        </div>

                        <h1 className="fw-bold">
                            {t("Looking for a dream job?")}
                        </h1>
                        <p>
                            {t("We're here to help!")}
                        </p>
                    </div>

                    <div className="col-12 mb-5">
                        <button className='btn btn-primary btn-lg me-4'>{t("Start searching")}</button>
                        <button className='btn btn-outline-light btn-lg'>{t("Register")}</button>
                    </div>
                </div>
            </PageSection>

            <PageSection className={"bg-white"}>
                <FancyTitle heading={t("Recently added jobs").toUpperCase()} subtitle={t("Fresh out of the oven")}/>

                <div className="row mb-5">
                    {newestJobs.map((job, index) => JobCard({job, index}))}
                </div>
            </PageSection>

            <PageSection className={"bg-dark"}>
                <FancyTitle darkBg={true} heading={t("Why choose JobHuntr?").toUpperCase()} subtitle={t("Let us help you")}/>

                <div className="row">
                    <div className="col-4">
                        <IconCard alignMiddle={true} darkBg={true} icon={<i className="fa-solid fa-clipboard-list fa-4x"></i>}
                                  heading={t("Comprehensive Job Listings")}>
                            <p>{t("Access a wide range of job opportunities across various industries and locations. JobHuntr ensures you have the latest and most relevant job postings.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={true} darkBg={true} icon={<i className="fa-solid fa-user-group fa-4x"></i>}
                                  heading={t("User-Friendly Experience")}>
                            <p>{t("Enjoy an intuitive interface with advanced search filters and personalized job recommendations. Apply quickly and efficiently with our streamlined application process.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-4">
                        <IconCard alignMiddle={true} darkBg={true} icon={<i className="fa-solid fa-handshake-angle fa-4x"></i>}
                                  heading={t("Support and Resources")}>
                            <p>{t("Benefit from resume building tools (coming soon), interview tips, and career advice. Our dedicated support team is always available to assist you throughout your job search.")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>

            <PageSection className={"bg-white"}>
                <FancyTitle heading={t("In the workshop").toUpperCase()} subtitle={t("These jobs might be coming soon")}/>

                <div className="row">
                    {draftedJobs.length > 0 ? draftedJobs.map((job, index) => {
                        return JobCard({job, index}, true)
                    })
                    :
                        <div className="col-12 my-auto text-center">
                            <div className="col-4 mx-auto border rounded shadow p-4 my-4">
                                <i className="fa-solid fa-circle-check fa-2x text-primary mb-3"></i>
                                <h1 className="fw-bold">{t("Hurray!")}</h1>
                                <p>{t("All jobs on JobHuntr are already posted!")}</p>
                                <button className="btn btn-primary fw-bold mt-4">{t("See available jobs")}</button>
                            </div>
                        </div>
                    }
                </div>
            </PageSection>

            <PageSection className={"bg-white"}>
                <FancyTitle darkBg={false} heading={t("Contact us")} subtitle={t("Need help?")} />

                <div className="col-9 my-5 mx-auto" id="contact-form">
                    <ContactForm />
                </div>
            </PageSection>
        </MainLayout>
    );
}


