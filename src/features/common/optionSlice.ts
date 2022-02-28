import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCountries, getStates } from '../../api/optionAPI';
import { AppThunk } from '../../app/store';
import { Country } from '../../types';
import { State } from '../../types/optinos';

export interface OptionState {
  countries: Country[];
  states: State[];
}

export interface OptionDataPayLoad {
  countries: Country[];
  states: State[];
}

const initialState: OptionState = {
  countries: [],
  states: [],
};

const optionSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {
    completeOptionLoad(state: OptionState, action: PayloadAction<OptionDataPayLoad>) {
      state.countries = action.payload.countries;
      state.states = action.payload.states;
    },
  },
});

export const { completeOptionLoad } = optionSlice.actions;

export default optionSlice.reducer;

export const fetchOptions = (): AppThunk => async (dispatch) => {
  try {
    const [countries, states] = await Promise.all([getCountries(), getStates()]);
    dispatch(completeOptionLoad({ countries, states }));
  } catch (err) {}
};
