interface PageSectionInterface {
    className ?: string,
    fullWidth ?: boolean,
    children ?: any
}

export default function ({ className = "bg-dark",fullWidth = false, children }: PageSectionInterface) {
    return (
        <div className={className + " " + "p-2 py-4 "}>
            <div className={(fullWidth ? "col-12 ms-5" : "col-9") + " mx-auto"}>
                { children }
            </div>
        </div>
    );
}
