import ApplicationLogo from '../Components/ApplicationLogo.js';
import { Link } from '@inertiajs/react';
import Header from "../Pages/Parts/Header.tsx";
import Footer from "../Pages/Parts/Footer";

export default function Guest({ children }) {
    return (
        <div className="container-fluid">
            <div className="row bg-dark sticky-top">
                <div className="col-9 mx-auto">
                    <div className="row py-2 border-bottom border-white border-opacity-50">
                        <div className="col-4">
                            <Link href="/">
                                <ApplicationLogo/>
                            </Link>
                        </div>
                        <div className="col-8 my-auto">
                            <Header darkBg={true}/>
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
