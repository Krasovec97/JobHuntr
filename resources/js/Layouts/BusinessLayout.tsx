import ApplicationLogo from '../Components/ApplicationLogo.js';
import { Link } from '@inertiajs/react';
import Header from "../Pages/Parts/Header.tsx";
import Footer from "../Pages/Parts/Footer";
import BusinessHeader from "../Pages/Parts/BusinessHeader";

export default function ({ children }) {
    return (
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-12 col-md-2 bg-dark">
                    <div className="row py-2">
                        <div className="col-12">
                            <Link href="/dashboard">
                                <ApplicationLogo/>
                            </Link>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <BusinessHeader />
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
