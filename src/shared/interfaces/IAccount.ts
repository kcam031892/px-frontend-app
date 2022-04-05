export interface IAccount {
    id: string;
    type: string;
    attributes: {
        id: string;
        email: string;
        full_name: string;
        first_name: string;
        last_name: string;
        gender: string;
        contact_no: string;
        country_of_residence: string;
        state_region: string;
        primary_type: string;
        adult_minor: string;
        age_range_from: string;
        age_range_to: string;
        birth_date: string;
        representation: boolean;
        preferred_contact_method: string;
        created_at: number;
        updated_at: number;
    };
}

export interface IAccountResponsePayload {
    data: IAccount;
}

export interface IAccountUpdatePayload {
    email: string;
    full_name: string;
    first_name: string;
    last_name: string;
    gender: string;
    contact_no: string;
    country_of_residence: string;
    state_region: string;
    primary_type?: string;
    adult_minor?: string;
    age_range_from?: string;
    age_range_to?: string;
    birth_date?: string;
    representation: boolean;
    preferred_contact_method?: string;
}