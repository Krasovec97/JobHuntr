import React from "react";

interface OCardInterface {
    headerText: string,
    count: number,
    desc: string
}


export default function ({headerText, count, desc}: OCardInterface) {
    return (
        <div className={"shadow text-center p-3 m-4  rounded-2"}>
            <h1 className={"fw-bold text-white p-2 my-3 bg-primary rounded-2 col-auto mx-auto"}>{count}</h1>
            <h3 className={"fw-semibold"}>{headerText.toUpperCase()}</h3>
            <p className={"small"}>{desc}</p>
        </div>
    )
}
