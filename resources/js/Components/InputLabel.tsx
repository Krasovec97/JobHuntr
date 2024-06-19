import React from "react";

interface ComponentProps {
    value: string,
    className?: string,
    children?: Element
}

export default function InputLabel({ value, className = '', children, ...props }: ComponentProps) {
    return (
        <label {...props} className={className}>
            {value ? value : children}
        </label>
    );
}
