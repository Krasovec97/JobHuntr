import React from "react";

interface componentProps {
    subtitle: string,
    heading: string,
    darkBg?: boolean
}

export default function ({ subtitle, heading, darkBg }: componentProps) {
    let bgClass = darkBg ? 'text-white' : 'text-dark text-opacity-75';
    return (
        <div className="row justify-content-center text-center my-4 text-grey">
            <p className="p-0 m-0">{subtitle}</p>
            <h2 className={bgClass + " " + "fw-bold"}>{heading}</h2>
            <div className="col-1">
                <div className="col-4 mx-auto border-2 border-bottom border-primary"></div>
            </div>
        </div>
    );
}
