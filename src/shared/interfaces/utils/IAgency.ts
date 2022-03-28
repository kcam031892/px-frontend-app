export interface IAgency {
  id: string;
  name: string;
  country: string;
}

export interface IAgencyResponsePayload {
  data: Array<{
    id: string;
    type: string;
    attributes: IAgency;
  }>;
}
