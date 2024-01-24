import {ReactNode} from "react";

interface FormWrapperProps {
    title: string,
    children: ReactNode
}

export function FormWrapper({ title, children }: FormWrapperProps)
{
    return (
        <>
            <h2 className={"text-center"}>{title}</h2>
            <div className={"row col-7 mx-auto"}>
                {children}
            </div>
        </>
    )
}
