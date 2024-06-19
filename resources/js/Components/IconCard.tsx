import React, {ReactElement} from "react";

interface ComponentProps {
    icon: ReactElement,
    heading: string,
    children: React.JSX.Element,
    darkBg?: boolean,
    alignMiddle?: boolean
}


export default function ({ icon, heading, children, darkBg, alignMiddle }: ComponentProps) {
    let bgClass = darkBg ? "text-white" : "text-dark text-opacity-75";

    if (alignMiddle === true) {
        return (
            <div className="row justify-content-center text-center my-4 text-grey">
                <div className="text-primary mb-4 py-5 w-50 border-corners rounded">{icon}</div>
                <h4 className={bgClass + " " + "fw-bold"}>{heading}</h4>
                <div className="col-2 my-3">
                    <div className="col-6 mx-auto border-2 border-bottom border-primary"></div>
                </div>
                <div>{children}</div>
            </div>
        );
    } else {
        return (
            <div className="row my-4 text-grey">
                <div className="text-primary mb-4  w-50">{icon}</div>
                <h4 className={bgClass + " " + "fw-bold"}>{heading}</h4>
                <div className="col-2 mb-3">
                    <div className="col-6 border-2 border-bottom border-primary"></div>
                </div>
                <div>{children}</div>
            </div>
        );
    }

}
