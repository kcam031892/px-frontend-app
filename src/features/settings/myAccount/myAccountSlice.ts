import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyAccountState, MyAccountModel, ValidateError } from './myAccountTypes';
import { Gender, AgeType, ContactType } from '../../../types/commonTypes';
import { Range } from '../../../utils/array';
import { AppThunk } from '../../../app/store';
import { ArtistType, Country, State } from '../../../types/optinos';
import { getAccount, postAccount } from '../../../api/myAccount';
import { getCountries, getStates, getArtistTypes } from '../../../api/optionAPI';
import { isValidEmail } from '../../../utils/textUtils';
import { parsePhoneNumber } from 'react-phone-number-input';

interface ChangeOptionPayload {
  fieldName: string;
  value: string;
}

interface DataLoadPayLoad {
  countries: Country[];
  states: State[];
  artistTypes: ArtistType[];
  account: MyAccountModel;
}

let initialState: MyAccountState = {
  model: {
    memberId: '',
    firstName: '',
    lastName: '',
    gender: 'MALE',
    dob: null,
    email: '',
    contactNumberCountryCode: '',
    contactNumber: '',
    countryCode: 'AU',
    homeStateId: 0,
    primaryArtistTypeCode: '',
    ageType: AgeType.Adult,
    ageFrom: 17,
    ageTo: 100,
    preferContactMethod: ContactType.Email,
    seekRepresentation: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    enableMultiFactorAuth: true,
    day: 0,
    month: 0,
    year: 0,
  },
  ageOptions: Range(17, 120),
  countries: [],
  states: [],
  artistTypes: [],
  valdiateErrors: [],
};

function generateAgeRange(state: MyAccountState) {
  const adultAgeStart = state.model.countryCode === 'AU' || state.model.countryCode === 'NZ' ? 17 : 18;
  const ageStart = adultAgeStart;
  const ageEnd = 120;
  state.ageOptions = Range(ageStart, ageEnd);
  if (!state.ageOptions.find((x) => x === state.model.ageFrom)) {
    state.model.ageFrom = null;
  }

  if (!state.ageOptions.find((x) => x === state.model.ageTo)) {
    state.model.ageTo = null;
  }
}

const myAccountSlice = createSlice({
  name: 'myAccount',
  initialState,
  reducers: {
    loadDataSuccess(state: MyAccountState, action: PayloadAction<DataLoadPayLoad>) {
      const resultModel = action.payload.account;
      state.countries = action.payload.countries;
      state.states = action.payload.states;
      state.artistTypes = action.payload.artistTypes;
      const phoneNumber = parsePhoneNumber(resultModel.contactNumber);
      if (phoneNumber && phoneNumber.countryCallingCode && phoneNumber.nationalNumber) {
        state.model = {
          ...resultModel,
          contactNumber: phoneNumber.nationalNumber,
          contactNumberCountryCode: '+' + phoneNumber.countryCallingCode,
        };
      } else {
        state.model = resultModel;
      }
      generateAgeRange(state);
    },
    updateAccount(state: MyAccountState, action: PayloadAction<ChangeOptionPayload>) {
      if (action.payload.fieldName === 'firstName') {
        state.model.firstName = action.payload.value;
      } else if (action.payload.fieldName === 'lastName') {
        state.model.lastName = action.payload.value;
      } else if (action.payload.fieldName === 'gender') {
        state.model.gender = action.payload.value as Gender;
      } else if (action.payload.fieldName === 'email') {
        state.model.email = action.payload.value;
      } else if (action.payload.fieldName === 'contactNumber') {
        state.model.contactNumber = action.payload.value;
      } else if (action.payload.fieldName === 'ageFrom') {
        state.model.ageFrom = Number.parseInt(action.payload.value);
      } else if (action.payload.fieldName === 'ageTo') {
        state.model.ageTo = Number.parseInt(action.payload.value);
      } else if (action.payload.fieldName === 'currentPassword') {
        state.model.currentPassword = action.payload.value;
      } else if (action.payload.fieldName === 'newPassword') {
        state.model.newPassword = action.payload.value;
      } else if (action.payload.fieldName === 'confirmPassword') {
        state.model.confirmPassword = action.payload.value;
      } else if (action.payload.fieldName === 'preferContactMethod') {
        state.model.preferContactMethod = action.payload.value as ContactType;
      } else if (action.payload.fieldName === 'primaryArtistTypeCode') {
        state.model.primaryArtistTypeCode = action.payload.value;
      } else if (action.payload.fieldName === 'year') {
        state.model.year = Number.parseInt(action.payload.value);
      } else if (action.payload.fieldName === 'month') {
        state.model.month = Number.parseInt(action.payload.value);
      } else if (action.payload.fieldName === 'day') {
        state.model.day = Number.parseInt(action.payload.value);
      } else if (action.payload.fieldName === 'countryCode') {
        state.model.countryCode = action.payload.value;
        state.model.homeStateId = 0;
      } else if (action.payload.fieldName === 'homeStateId') {
        state.model.homeStateId = Number.parseInt(action.payload.value);
      } else if (action.payload.fieldName === 'ageType') {
        state.model.ageType = Number.parseInt(action.payload.value) as AgeType;
      } else if (action.payload.fieldName === 'seekRepresentation') {
        state.model.seekRepresentation = action.payload.value === 'true';
      }
      generateAgeRange(state);
      state.valdiateErrors = validateAccount(state.model, false);
    },
    updateValidationErrors(state: MyAccountState, action: PayloadAction<ValidateError[]>) {
      state.valdiateErrors = action.payload;
    },
  },
});

export const { loadDataSuccess, updateAccount, updateValidationErrors } = myAccountSlice.actions;

export default myAccountSlice.reducer;

export const fetAccountPageData =
  (memberId: string): AppThunk =>
  async (dispatch) => {
    try {
      const [countries, states, artistTypes, account] = await Promise.all([
        getCountries(),
        getStates(),
        getArtistTypes(),
        getAccount(memberId),
      ]);
      dispatch(loadDataSuccess({ countries, states, artistTypes, account }));
    } catch (err) {}
  };

export const saveAccountPageData =
  (account: MyAccountModel): AppThunk =>
  async (dispatch) => {
    try {
      const validationErrors = validateAccount(account, true);
      if (validationErrors.length === 0) {
        await postAccount(account);
      } else {
        dispatch(updateValidationErrors(validationErrors));
      }
    } catch (err) {}
  };

function validateAccount(account: MyAccountModel, isPostValidate: boolean): ValidateError[] {
  const errors: ValidateError[] = [];
  if ((account.firstName || '').trim().length === 0) {
    errors.push({
      field: 'firstName',
      message: 'First Name is required',
    });
  }

  if ((account.lastName || '').trim().length === 0) {
    errors.push({
      field: 'lastName',
      message: 'Last Name is required',
    });
  }

  if ((account.email || '').trim().length === 0) {
    errors.push({
      field: 'email',
      message: 'Email is required',
    });
  } else {
    if (!isValidEmail(account.email)) {
      errors.push({
        field: 'email',
        message: 'Email is invalid',
      });
    }
  }

  if ((account.contactNumber || '').trim().length === 0) {
    errors.push({
      field: 'contactNumber',
      message: 'Contact Number is required',
    });
  }

  if (isPostValidate) {
    const homeStateId = account.homeStateId || 0;
    if (homeStateId === 0) {
      errors.push({
        field: 'homeStateId',
        message: 'State/Region is required',
      });
    }
  }

  return errors;
}
