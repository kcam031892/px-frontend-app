import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getResume, postResume } from '../../../api/myResume';
import { AppThunk } from '../../../app/store';
import { Direction, ResumeModel, ResumeSection, ResumeSectionType, ResumeState } from './ResumeTypes';
import * as _ from 'lodash';

interface AddSectionPayload {
  title: string;
  type: ResumeSectionType;
}

interface OrderSectionPayload {
  sectionId: number;
  direction: Direction;
}

interface DeleteSectionPayload {
  sectionId: number;
}

interface ChangeResumeTablePayload {
  sectionId: string;
  direction: Direction;
}

interface ChangeSectionTextPayload {
  sectionId: number;
  text: string;
  row?: number;
  column?: number;
}

interface ChangeSectionTitlePayload {
  sectionId: number;
  title: string;
}

interface DeleteTableRowPayload {
  sectionId: number;
  rowIndex: number;
}

interface ChangeTableRowConfigPayload {
  sectionId: number;
  rows: number;
  columns: number;
}

interface ReorderTableRowConfigPayload {
  sectionId: number;
  sourceIndex: number;
  destIndex: number;
}

const initialState: ResumeState = {
  model: {
    profileId: '',
    sections: [],
  },
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    loadDataSuccess(state: ResumeState, action: PayloadAction<ResumeModel>) {
      state.model = action.payload;
    },

    addSection(state: ResumeState, action: PayloadAction<AddSectionPayload>) {
      const sections = state.model.sections;
      const maxSequece = _.max(sections.map((x) => x.sequence)) || 0;
      const maxId = _.max(sections.map((x) => x.sectionId)) || 0;
      const section: ResumeSection = {
        sequence: maxSequece + 1,
        sectionId: maxId + 1,
        title: action.payload.title,
        sectionType: action.payload.type,
      };

      if (action.payload.type === ResumeSectionType.Table) {
        section.rowCount = 3;
        section.columnCount = 4;
        section.texts = [];
      } else {
        section.paragraphText = '';
      }

      state.model.sections.push(section);
    },

    removeSection(state: ResumeState, action: PayloadAction<number>) {
      state.model.sections = state.model.sections.filter((section) => section.sectionId !== action.payload);
    },

    orderSection(state: ResumeState, action: PayloadAction<OrderSectionPayload>) {
      const toOrderSectionIndex = state.model.sections.findIndex(
        (section) => section.sectionId === action.payload.sectionId,
      );
      if (toOrderSectionIndex > -1) {
        //first or last section can move up/down
        if (toOrderSectionIndex === 0 && action.payload.direction === Direction.Up) {
          return;
        }
        if (toOrderSectionIndex === state.model.sections.length - 1 && action.payload.direction === Direction.Down) {
          return;
        }

        const toReplaceIndex = toOrderSectionIndex + (action.payload.direction === Direction.Up ? -1 : 1);
        const section = state.model.sections[toOrderSectionIndex];
        const toReplaceSection = state.model.sections[toReplaceIndex];
        const sequece = toReplaceSection.sequence;
        toReplaceSection.sequence = section.sequence;
        section.sequence = sequece;
        state.model.sections[toOrderSectionIndex] = toReplaceSection;
        state.model.sections[toReplaceIndex] = section;
      }
    },

    changeText(state: ResumeState, action: PayloadAction<ChangeSectionTextPayload>) {
      const section = state.model.sections.find((x) => x.sectionId === action.payload.sectionId);
      if (section) {
        if (section.sectionType === ResumeSectionType.TextArea) {
          section.paragraphText = action.payload.text;
        } else {
          section.texts = section.texts || [];
          const rowIndex = action.payload.row || 0;
          const columnIndex = action.payload.column || 0;
          const textItem = section.texts?.find((x) => x.columnIndex === columnIndex && x.rowIndex === rowIndex);
          if (textItem) {
            textItem.text = action.payload.text;
          } else {
            section.texts.push({
              columnIndex: columnIndex,
              rowIndex: rowIndex,
              text: action.payload.text,
            });
          }
        }
      }
    },

    changeTitle(state: ResumeState, action: PayloadAction<ChangeSectionTitlePayload>) {
      const section = state.model.sections.find((x) => x.sectionId === action.payload.sectionId);
      if (section) {
        section.title = action.payload.title;
      }
    },

    deleteTableRow(state: ResumeState, action: PayloadAction<DeleteTableRowPayload>) {
      const section = state.model.sections.find(
        (x) => x.sectionId === action.payload.sectionId && x.sectionType === ResumeSectionType.Table,
      );
      if (section) {
        section.rowCount = (section.rowCount || 0) - 1;
        section.texts = section.texts?.filter((x) => x.rowIndex !== action.payload.rowIndex);
        section.texts
          ?.filter((x) => x.rowIndex > action.payload.rowIndex)
          .forEach((x) => {
            const item = x;
            item.rowIndex = item.rowIndex - 1;
          });
      }
    },

    changeTableConfig(state: ResumeState, action: PayloadAction<ChangeTableRowConfigPayload>) {
      const section = state.model.sections.find(
        (x) => x.sectionId === action.payload.sectionId && x.sectionType === ResumeSectionType.Table,
      );
      if (section) {
        section.rowCount = action.payload.rows;
        section.columnCount = action.payload.columns;
      }
    },

    reorderTableRow(state: ResumeState, action: PayloadAction<ReorderTableRowConfigPayload>) {
      const section = state.model.sections.find(
        (x) => x.sectionId === action.payload.sectionId && x.sectionType === ResumeSectionType.Table,
      );
      if (section) {
        const sourceTexts = section.texts?.filter((x) => x.rowIndex === action.payload.sourceIndex) || [];
        const destTexts = section.texts?.filter((x) => x.rowIndex === action.payload.destIndex) || [];
        sourceTexts.forEach((x) => {
          const item = x;
          item.rowIndex = action.payload.destIndex;
        });
        destTexts.forEach((x) => {
          const item = x;
          item.rowIndex = action.payload.sourceIndex;
        });
      }
    },
  },
});

export const {
  addSection,
  removeSection,
  orderSection,
  changeText,
  changeTitle,
  reorderTableRow,
  deleteTableRow,
  changeTableConfig,
  loadDataSuccess,
} = resumeSlice.actions;

export default resumeSlice.reducer;

export const fetchResume =
  (profileId: string): AppThunk =>
  async (dispatch) => {
    try {
      const biography = await getResume(profileId);
      dispatch(loadDataSuccess(biography));
    } catch (err) {}
  };

export const saveResume =
  (resume: ResumeModel): AppThunk =>
  async (dispatch) => {
    try {
      await postResume(resume);
      fetchResume(resume.profileId);
    } catch (err) {}
  };
