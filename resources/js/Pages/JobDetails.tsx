import React from "react";
import {JobInterface} from "../Interfaces/SharedInterfaces";
import MainLayout from "../Layouts/MainLayout";
import {Head} from "@inertiajs/react";
import PageSection from "./Parts/PageSection";

export default function JobDetails({job}: JobInterface) {
    return (
        <MainLayout>
            <Head title="Job Details"/>

            <PageSection className={"bg-white"} fullWidth={true}>
                This job is: {job.title}
            </PageSection>
        </MainLayout>
    );
}
