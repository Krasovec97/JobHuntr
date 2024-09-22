import {ReactNode} from "react";
import FancyTitle from "@/Components/FancyTitle";
import React from "react";

interface FormWrapperProps {
    title: string,
    subtitle: string,
    children: ReactNode
}

export function FormWrapper({ title, subtitle, children }: FormWrapperProps)
{
    return (
        <>
            <FancyTitle subtitle={subtitle} heading={title} />
            <div className={"row col-12 mx-auto"}>
                {children}
            </div>
        </>
    )
}
