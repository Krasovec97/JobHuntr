export default function ({ whiteSection, children }) {
    let background = "";
    whiteSection ? background = "bg-white" : background = "bg-custom-dark";

    return (
        <div className={background + " " + "p-2 py-4"}>
            <div className="col-9 mx-auto">
                { children }
            </div>
        </div>
    );
}
