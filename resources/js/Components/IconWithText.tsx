import React from "react";

interface ComponentProps {
    icon: any,
    text: string
}

export default function ({icon, text}: ComponentProps) {
    return (
        <div className="col-4 text-center">
            <div>
                {icon}
            </div>
            <div className="ms-3">{text}</div>
        </div>
    )
}
