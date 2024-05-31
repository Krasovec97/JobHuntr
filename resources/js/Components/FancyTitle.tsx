export default function ({ subtitle, heading, darkBg }) {
    darkBg = darkBg ? 'text-white' : 'text-dark text-opacity-75';
    return (
        <div className="row justify-content-center text-center my-4 text-grey">
            <p className="p-0 m-0">{subtitle}</p>
            <h1 className={darkBg + " " + "fw-bold"}>{heading}</h1>
            <div className="col-1">
                <div className="col-4 mx-auto border-2 border-bottom border-primary"></div>
            </div>
        </div>
    );
}
