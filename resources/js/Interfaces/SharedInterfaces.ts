export interface JobInterface {
    company_id: number,
    created_at: string,
    deleted_at?: string,
    description: string,
    employment_type: string,
    expires_at?: string,
    id: number,
    open_positions_count: number,
    posted_at?: string,
    preferred_education: string,
    preferred_gender: string,
    salary: number,
    salary_currency: string,
    status: string,
    title: string,
    updated_at: string,
    work_area_id: number,
    work_field_id: number,
    work_field?: WorkFieldInterface,
    work_area?: WorkAreaInterface,
    work_location: string
}

export interface WorkFieldInterface {
    created_at?: string,
    id?: number,
    name: string,
    updated_at?: string,
    work_area_id: number
}

export interface WorkAreaInterface {
    id: number,
    name: string,
    created_at?: string,
    updated_at?: string
}
