import ApplicationLogo from '../Components/ApplicationLogo.js';
import { Link } from '@inertiajs/react';
import Header from "../Pages/Parts/Header.tsx";
import Footer from "../Pages/Parts/Footer";

export default function ({ children }) {
    return (
        <div className="container-fluid">
            <div className="row bg-dark sticky-top">
                <div className="col-10 mx-auto">
                    <div className="row py-2">
                        <div className="col-4">
                            <Link href="/dashboard">
                                <ApplicationLogo />
                            </Link>
                        </div>
                    </div>
                </div>
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
