export interface AccountState {
  signUpSuccess: boolean;
  signUpConfirmSuccess: boolean;
  representationRequest?: RepresentationRequestViewModel;
}

export interface RepresentationRequestViewModel {
  firstName: string;
  lastName: string;
  agencyName: string;
}
