import ApplicationLogo from '../Components/ApplicationLogo.js';
import { Link } from '@inertiajs/react';
import BusinessHeader from "../Pages/Parts/BusinessHeader";
import styled from "styled-components";

export default function ({ children }) {
    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <MenuSidebar>
                    <div className="row py-2">
                        <div className="col-12">
                            <Link href="/dashboard">
                                <ApplicationLogo/>
                            </Link>
                        </div>
                    </div>

                    <div className="row vh-fill">
                        <div className="col-md-8 mx-auto">
                            <BusinessHeader />
                        </div>
                    </div>
                </MenuSidebar>

                <PageContent>
                    {children}
                </PageContent>
            </div>
        </div>
    );
}

let MenuSidebar = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    min-width: 0;
    max-width: 300px;
    background-color: #1a1a1a;
    height: 100vh;
`

let PageContent = styled.div`
    position: relative;
    width: calc(100% - 300px);
`
