import React from "react";

interface ComponentProps {
    icon: any,
    text: string
}

export default function ({icon, text}: ComponentProps) {
    return (
        <div className="d-flex align-middle">
            {icon}
            <div className="ms-3">{text}</div>
        </div>
    )
}
