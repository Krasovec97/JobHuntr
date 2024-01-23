interface PageSectionInterface {
    whiteSection ?: boolean,
    children ?: any
}

export default function ({ whiteSection, children }: PageSectionInterface) {
    let background = "";
    whiteSection ? background = "bg-white" : background = "bg-dark";

    return (
        <div className={background + " " + "p-2 py-4"}>
            <div className="col-9 mx-auto">
                { children }
            </div>
        </div>
    );
}
