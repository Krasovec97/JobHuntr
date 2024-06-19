import React from "react";

interface PageSectionInterface {
    className ?: string,
    fullWidth ?: boolean,
    children ?: any
}

export default function ({ className = "bg-dark",fullWidth = false, children }: PageSectionInterface) {
    return (
        <div className={className}>
            <div className={(fullWidth ? "col-12" : "col-9") + " mx-auto"}>
                { children }
            </div>
        </div>
    );
}
