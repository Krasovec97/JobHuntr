interface PageSectionInterface {
    className ?: string,
    children ?: any
}

export default function ({ className = "bg-dark", children }: PageSectionInterface) {
    return (
        <div className={className + " " + "p-2 py-4 "}>
            <div className="col-9 mx-auto">
                { children }
            </div>
        </div>
    );
}
