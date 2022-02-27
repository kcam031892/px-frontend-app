import { AgeType, SizeUnit } from '../../../types';
import { StatsState, StatsModel } from './statsTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../../app/store';
import { getMyStats, postStats } from '../../../api/myStats';

interface ChangeItemPayLoad {
  code: string;
  value: string;
}

interface ChangeEthnicityItemPayLoad {
  group: string;
  itemCode: string;
  checked: boolean;
}

interface ChangeArtistTypePayLoad {
  artistTypeCode: string;
  checked: boolean;
}

const initialState: StatsState = {
  model: {
    memberId: '',
    gender: 'FEMA',
    region: 'US',
    ageType: AgeType.Adult,
    sizeUnit: SizeUnit.Both,
    primaryArtistTypeName: '',
    ethnicities: [],
    ethnicitiesTemp: [],
    artistTypes: [],
    artistTypesTemp: [],
    options: [],
  },
  isDirty: false,
};

const statsmSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    loadDataSuccess(state: StatsState, action: PayloadAction<StatsModel>) {
      state.model = action.payload;
      state.isDirty = false;
    },
    changeStatsItem(state: StatsState, action: PayloadAction<ChangeItemPayLoad>) {
      const option = state.model.options.find((x) => x.code === action.payload.code) || { code: '', selectedValue: '' };
      option.selectedValue = action.payload.value;
      state.isDirty = true;
    },
    resetEthnicityTemp(state: StatsState) {
      state.model.ethnicitiesTemp = [...state.model.ethnicities];
    },
    resetArtistTypeTemp(state: StatsState) {
      state.model.artistTypesTemp = [...state.model.artistTypes];
    },
    clearGroupSelectedItems(state: StatsState, action: PayloadAction<string>) {
      const ethnicities = state.model.ethnicitiesTemp;
      const group = ethnicities.find((x) => x.text === action.payload);
      if (group) {
        group.items.forEach((x) => {
          const item = x;
          item.selected = false;
        });
      }
    },
    changeEthnicityItemStatus(state: StatsState, action: PayloadAction<ChangeEthnicityItemPayLoad>) {
      const ethnicities = state.model.ethnicitiesTemp;
      const group = ethnicities.find((x) => x.text === action.payload.group);
      if (group) {
        const item = group.items.find((x) => x.code === action.payload.itemCode);
        if (item) {
          item.selected = action.payload.checked;
        }
      }
    },
    changeArtistTypeStatus(state: StatsState, action: PayloadAction<ChangeArtistTypePayLoad>) {
      const artistTypes = state.model.artistTypesTemp;
      const item = artistTypes.find((x) => x.value === action.payload.artistTypeCode);
      if (item) {
        item.selected = action.payload.checked;
      }
    },
    applyEthnicityChange(state: StatsState) {
      state.model.ethnicities = state.model.ethnicitiesTemp;
    },
    applyArtistTypeChange(state: StatsState) {
      state.model.artistTypes = state.model.artistTypesTemp;
    },
    removeEthnicityItem(state: StatsState, action: PayloadAction<string>) {
      const ethnicities = state.model.ethnicities;
      const items = ethnicities.flatMap((x) => x.items);
      const item = items.find((x) => x.code === action.payload);
      if (item) {
        item.selected = false;
      }
    },
    removeArtistType(state: StatsState, action: PayloadAction<string>) {
      const artistTypes = state.model.artistTypes;
      const item = artistTypes.find((x) => x.value === action.payload);
      if (item) {
        item.selected = false;
      }
    },
  },
});

export const {
  changeStatsItem,
  loadDataSuccess,
  resetEthnicityTemp,
  clearGroupSelectedItems,
  changeEthnicityItemStatus,
  applyEthnicityChange,
  removeEthnicityItem,
  resetArtistTypeTemp,
  changeArtistTypeStatus,
  applyArtistTypeChange,
  removeArtistType,
} = statsmSlice.actions;

export default statsmSlice.reducer;

export const fetchMyStatsData =
  (memberId: string, countryCode?: string, gender?: string, ageType?: AgeType, sizeUnit?: SizeUnit): AppThunk =>
  async (dispatch) => {
    try {
      const [myStats] = await Promise.all([getMyStats(memberId, countryCode, gender, ageType, sizeUnit)]);
      dispatch(loadDataSuccess(myStats));
    } catch (err) {}
  };

export const saveStatsData =
  (model: StatsModel): AppThunk =>
  async (dispatch) => {
    try {
      await postStats(model);
    } catch (err) {}
  };
