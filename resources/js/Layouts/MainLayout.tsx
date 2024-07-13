import Header from "../Pages/Parts/Header";
import Footer from "../Pages/Parts/Footer";
import React from "react";

export default function ({ children }: any) {
    return (
        <div className="container-fluid">
            <div className="row bg-dark sticky-top">
                <Header darkBg={true}/>
            </div>

            <div className="row">
                {children}
            </div>

            <div className="row">
                <Footer />
            </div>
        </div>
    );
}
