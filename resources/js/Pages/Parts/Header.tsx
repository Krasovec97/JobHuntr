import {Link} from "@inertiajs/react";

interface HeaderInterface {
    darkBg :boolean
}

export default function ({darkBg}: HeaderInterface) {
    let textColor: string = darkBg ? 'text-white' : 'text-dark';

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link href="/" className={textColor + " nav-link"}>HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={textColor + " nav-link"} href="#">LINK</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={textColor + " nav-link"} aria-disabled="true">DISABLED</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
