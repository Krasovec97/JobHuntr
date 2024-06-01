import Header from "../Pages/Parts/Header.tsx";
import Footer from "../Pages/Parts/Footer";

export default function ({ children }) {
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
