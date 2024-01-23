interface PageSectionInterface {
    background ?: string,
    children ?: any
}

export default function ({ background = "bg-dark", children }: PageSectionInterface) {
    return (
        <div className={background + " " + "p-2 py-4 "}>
            <div className="col-9 mx-auto">
                { children }
            </div>
        </div>
    );
}
