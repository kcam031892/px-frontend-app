import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMySkill, postMySKill } from '../../../api/mySkill';
import { AppThunk } from '../../../app/store';
import { SkillLevel } from '../../../types';

import { SkillState, SkillPageType, SkillModel } from './skillTypes';

interface ChangeItemStatusPayload {
  itemId: number;
  checked: boolean;
}

interface ChangeSkillLevelPayload {
  groupId: number;
  itemId: number;
  level: SkillLevel;
}

function setSelectedGroup(state: SkillState, groupIndex: number) {
  if (groupIndex < state.model.groups.length) {
    const group = state.model.groups[groupIndex];
    if (group) {
      state.selectedGroupId = group.id;
      state.pageType = group.items.some((x) => x.selected) ? SkillPageType.Detail : SkillPageType.List;
      state.editGroup = { ...group };
    }
  }
}

let initialState: SkillState = {
  pageType: SkillPageType.List,
  selectedGroupId: 0,
  model: {
    memberId: '',
    groups: [],
  },
};

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    loadDataSuccess(state: SkillState, action: PayloadAction<SkillModel>) {
      state.model = action.payload;
      setSelectedGroup(state, 0);
    },
    changeGroup(state: SkillState, action: PayloadAction<number>) {
      setSelectedGroup(state, action.payload);
    },

    changeToListView(state: SkillState) {
      state.pageType = SkillPageType.List;
    },

    changeToDetailView(state: SkillState) {
      state.pageType = SkillPageType.Detail;
    },

    changeItemStatus(state: SkillState, action: PayloadAction<ChangeItemStatusPayload>) {
      const item = state.editGroup?.items.find((x) => x.id === action.payload.itemId);
      if (item) {
        item.selected = action.payload.checked;
        if (item.selected) {
          item.level = SkillLevel.Good;
        }
      }
    },
    applyChanges(state: SkillState) {
      const targetGroup = state.model.groups.find((x) => x.id === state.editGroup?.id);
      if (targetGroup) {
        targetGroup.items.forEach((x) => (x.selected = false));
        const selectedItems = state.editGroup?.items.filter((x) => x.selected);
        if (selectedItems) {
          selectedItems.forEach((x) => {
            const targetItem = targetGroup?.items.find((y) => y.id === x.id);
            if (targetItem) {
              targetItem.selected = true;
              targetItem.level = x.level;
            }
          });
        }
      }
      state.pageType = SkillPageType.Detail;
    },
    changeSkillLevel(state: SkillState, action: PayloadAction<ChangeSkillLevelPayload>) {
      const group = state.model.groups.find((x) => x.id === action.payload.groupId);
      if (group) {
        const item = group.items.find((x) => x.id === action.payload.itemId);
        if (item) {
          item.level = action.payload.level;
        }
      }
    },
  },
});

export const {
  loadDataSuccess,
  changeGroup,
  changeItemStatus,
  applyChanges,
  changeSkillLevel,
  changeToListView,
  changeToDetailView,
} = skillSlice.actions;

export default skillSlice.reducer;

export const fetchSkillData =
  (memberId: string): AppThunk =>
  async (dispatch) => {
    try {
      const [mySkill] = await Promise.all([getMySkill(memberId)]);
      dispatch(loadDataSuccess(mySkill));
    } catch (err) {}
  };

export const saveSkillData =
  (model: SkillModel): AppThunk =>
  async (dispatch) => {
    try {
      await postMySKill(model);
    } catch (err) {}
  };
