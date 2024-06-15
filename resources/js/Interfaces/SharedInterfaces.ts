export interface CompanyData {
    city: string,
    contact_person: string,
    contact_phone: string,
    country: string,
    email: string,
    full_name: string,
    id: number,
    is_vat_obligated: boolean,
    registration_house: string,
    company_number: string,
    short_name: string,
    street: string,
    updated_at: string,
    vat_id: string,
    zip: string
}


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
    work_location: string,
    street: string,
    zip: string,
    city: string,
    country:string
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

export interface UserData {
    id: number,
    contact_phone: string,
    country: string,
    street: string,
    city: string,
    zip: string,
    date_of_birth: string,
    education: string
}

export interface FilterTypes {
    location: Array<string>,
    employment_type: Array<string>,
    search_string: string,
    work_areas_string: string,
    work_fields_string: string
}
