import {Link} from "@inertiajs/react";

export default function () {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link href="/" className="nav-link text-white">HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" href="#">LINK</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" aria-disabled="true">DISABLED</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
