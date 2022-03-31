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
        country_of_resident: string;
        state_region: string;
        created_at: number;
        updated_at: number;
    };
}

export interface IAccountResponsePayload {
    data: IAccount;
}

export interface IAccountUpdatePayload {

}