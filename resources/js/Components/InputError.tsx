import React from "react";

interface ComponentProps {
    message: string,
    className: string,
    props: any
}
export default function InputError({ message, className = '', ...props }: ComponentProps) {
    return message ? (
        <p {...props} className={'text-danger ' + className}>
            {message}
        </p>
    ) : null;
}
