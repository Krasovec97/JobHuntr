import React from "react";

interface ComponentProps {
    icon: any,
    text: string
}

export default function ({icon, text}: ComponentProps) {
    return (
        <div className="col-4 text-center">
            <div className="mx-auto align-middle">
                {icon}
            </div>
            <div>{text}</div>
        </div>
    )
}
