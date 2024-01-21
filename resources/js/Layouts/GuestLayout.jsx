import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Header from "@/Pages/Parts/Header.jsx";

export default function Guest({ children }) {
    return (
        <div className="container">
            <div className="row py-2 mb-2 border-bottom border-white border-opacity-50">
                <div className="col-4">
                    <Link href="/">
                        <ApplicationLogo />
                    </Link>
                </div>
                <div className="col-8 my-auto">
                    <Header />
                </div>
            </div>

            <div className="row">
                {children}
            </div>
        </div>
    );
}
