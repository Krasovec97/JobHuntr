import {ErrorBag, Errors} from "@inertiajs/core/types/types";

export interface CompanyData {
    city: string,
    contact_person: string,
    contact_phone: string,
    country_id: number,
    email: string,
    name: string,
    id: number,
    is_vat_obligated: boolean,
    registration_house: string,
    company_number: string,
    street: string,
    updated_at: string,
    vat_id: string,
    zip: string,
    email_verified_at: string,
    email_verification_token: string,
    company_verified_at: string,
    coordinates: {
        latitude: number,
        longitude: number,
    },
}


export interface JobInterface {
    company_id: number,
    created_at: string,
    deleted_at?: string,
    employment_type: string,
    expires_at?: string,
    id: number,
    open_positions_count: number,
    posted_at?: string,
    minimum_education_id: number|null,
    education?: string,
    benefits: string,
    expectations: string,
    assignments: string,
    intro: string,
    method_of_payment: string,
    salary_from: number,
    salary_to: number,
    hourly_rate: number,
    salary_currency: string,
    status: string,
    title: string,
    updated_at: string,
    work_field_id: number,
    work_field?: WorkFieldInterface,
    work_location: string,
    street: string,
    zip: string,
    city: string,
    country_id: number,
    country_code: string,
    country: string,
    application_mail: string,
    region?: string,
    coordinates: {
        latitude: number,
        longitude: number,
    },
}

export interface WorkFieldInterface {
    created_at?: string,
    id?: number,
    name: string,
    updated_at?: string,
}

export interface UserData {
    id: number,
    name: string,
    email: string,
    contact_phone: string,
    country_id: number,
    country_code?: string,
    street: string,
    city: string,
    zip: string,
    date_of_birth: string,
    email_verified_at: string,
    education_id: number,
    resume_uploaded: boolean,
    can_apply: boolean,
    coordinates: {
        longitude: number,
        latitude: number
    },
    sales: boolean
}

export interface Country {
    value: string,
    label: string
}

export interface AddressComponent {
    longText: string,
    shortText: string,
    types: string[]
    languageCode: string
}

export interface LocationInterface {
    latitude: string,
    longitude: string,
}

export interface FilterTypes {
    location: string[],
    employment_types: string[],
    search_string: string,
    work_fields_string: string,
    radius?: number,
    current_position?: LocationInterface,
    education_id: number|null,
    regions_string: string
}

export interface EducationInterface {
    id: number,
    level: number,
    title: string,
    created_at: string,
    updated_at: string,
}

interface PageProps {
    [key: string]: unknown;
}
// noinspection JSUnusedLocalSymbols
interface Page<SharedProps extends PageProps = PageProps> {
    component: string;
    props: PageProps & SharedProps & {
        errors: Errors & ErrorBag;
    };
    url: string;
    version: string | null;
    /** @internal */
    scrollRegions: Array<{
        top: number;
        left: number;
    }>;
    /** @internal */
    rememberedState: Record<string, unknown>;
}


export interface CompanyAuthProps extends PageProps {
    auth: {
        company: CompanyData
    }
}

export interface UserAuthProps extends PageProps {
    auth: {
        user: UserData
    }
}

export interface PlacePredictionInterface {
    "placePrediction": {
        "place": string,
        "placeId": string,
        "text": {
            "text": string,
            "matches": [
                {
                    "endOffset": number
                }
            ]
        },
        "structuredFormat": {
            "mainText": {
                "text": string,
                "matches": [
                    {
                        "endOffset": number
                    }
                ]
            },
            "secondaryText": {
                "text": string
            }
        },
        "types": [
            "street_address",
            "geocode"
        ]
    }
}
