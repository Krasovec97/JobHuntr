import {Head, usePage} from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PageSection from "@/Components/PageSection";
import {useLaravelReactI18n} from "laravel-react-i18n";
import FancyTitle from "@/Components/FancyTitle";
import IconCard from "@/Components/IconCard";
import React from 'react';

export default function Companies() {
    const {t} = useLaravelReactI18n();

    return (
        <MainLayout>
            <Head title="Companies"/>

            <PageSection className="bg-dark">
                <div className="row text-white text-center flex-column justify-content-center">
                    <div className="col-12 py-5">
                        <div className="col-12">
                            <img src="/img/job_provider.webp" alt="noimg" height={250}/>
                        </div>

                        <h1 className="fw-bold">
                            {t("Offering work?")}
                        </h1>
                        <p>
                            {t("We're the ideal platform for posting job opportunities")}
                        </p>
                    </div>

                    <div className="col-12 mb-5">
                        <a className='btn btn-outline-light btn-lg fw-bold px-5' href={`https://${usePage().props.business_url}`}>{t("Company login").toUpperCase()}</a>
                    </div>
                </div>
            </PageSection>

            <PageSection className={"bg-white"}>
                <FancyTitle heading={t("The JobHuntr Advantage").toUpperCase()} subtitle={t("Why you'll love hiring with us")}/>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} icon={<i className="fa-solid fa-building-circle-check fa-4x"></i>}
                                  heading={t("Verified Companies")}>
                            <p>{t("At JobHuntr, we ensure the authenticity of every job listing by verifying each company before they can post. This builds trust with potential applicants and increases the quality of responses to your job ads.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} icon={<i className="fa-solid fa-gears fa-4x"></i>}
                                  heading={t("Modern Solutions for Efficient Hiring")}>
                            <p>{t("JobHuntr offers a sleek, user-friendly platform that modernizes the hiring process. Our upcoming features, including contract building and applicant management, streamline recruitment, saving you time and resources.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={true} icon={<i className="fa-solid fa-microchip fa-4x"></i>}
                                  heading={t("Future-Ready with AI-Driven Tools")}>
                            <p>{t("JobHuntr is designed with the future in mind. Our platform will soon include AI-powered tools to help you generate job details effortlessly, giving you complete control while making it easier to attract the right talent quickly and efficiently.")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>

            <PageSection className={"bg-dark"}>
                <FancyTitle darkBg={true} heading={t("Why JobHuntr Rocks!").toUpperCase()} subtitle={t("Discover the benefits of choosing us")}/>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-clock fa-2x"></i>}
                                  heading={t("Free to Start, Fair Pricing Always")}>
                            <p>{t("We are committed to making our platform accessible. Currently, JobHuntr is free to use, and even when we introduce pricing, we guarantee that our fees will remain fair and competitive, ensuring value for all users.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-arrow-trend-up fa-2x"></i>}
                                  heading={t("Modernizing the Hiring Process")}>
                            <p>{t("Our mission is to bring the hiring process into the 21st century. JobHuntr offers a modern, clean interface and plans to integrate advanced features that streamline and simplify recruitment, making it more efficient and effective.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-regular fa-lightbulb fa-2x"></i>}
                                  heading={t("Innovative and Unique Features")}>
                            <p>{t("JobHuntr is more than just a job listing site. We are developing unique tools such as AI-assisted job description generation, contract building, and applicant management, providing a comprehensive solution to meet all your hiring needs.")}</p>
                        </IconCard>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-seedling fa-2x"></i>}
                                  heading={t("Dedicated Support and Continuous Improvement")}>
                            <p>{t("We believe in providing exceptional support and continually improving our platform based on user feedback. Our dedicated team is always ready to assist you, ensuring a smooth and satisfactory experience.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-shield fa-2x"></i>}
                            heading={t("Secure and Reliable Platform")}>
                            <p>{t("Security is paramount at JobHuntr. We employ robust security measures to protect your data and ensure that your job listings are posted in a safe and reliable environment, giving you peace of mind as you recruit new talent.")}</p>
                        </IconCard>
                    </div>

                    <div className="col-12 col-md-4">
                        <IconCard alignMiddle={false} darkBg={true}
                                  icon={<i className="fa-solid fa-scale-balanced fa-2x"></i>}
                                  heading={t("Built on Integrity and Reliability")}>
                            <p>{t("JobHuntr is founded on principles of integrity and reliability. We rigorously verify each company to ensure only legitimate and trustworthy job listings are posted, building a platform you and your applicants can depend on.")}</p>
                        </IconCard>
                    </div>
                </div>
            </PageSection>
        </MainLayout>
    );
}


