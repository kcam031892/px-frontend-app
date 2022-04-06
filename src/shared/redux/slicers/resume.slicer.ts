import { arrayMove } from '@dnd-kit/sortable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SectionType } from 'shared/enums/SectionType';
import { ISection, ISectionValues } from 'shared/interfaces/ITalent';

import { createEmptyColumnArray, createEmptyTableArray } from 'shared/utils/createEmptyTableArray';
import { generateSectionId } from 'shared/utils/generateSectionId';

import { RootState } from '../store';

export interface IResumeState {
  sections: ISection[];
  oldSections: ISection[];
  isSectionShowYear: boolean;
}

const initialSections: ISection[] = [
  {
    section_type: SectionType.TABLE,
    title: 'Film',
    values: [
      {
        fields: createEmptyColumnArray(),
        attachments: [],
      },
    ],
    section_id: '',
  },
  {
    section_type: SectionType.TABLE,
    title: 'Television',
    values: [
      {
        fields: createEmptyColumnArray(),
        attachments: [],
      },
    ],
    section_id: '',
  },
  {
    section_type: SectionType.TABLE,
    title: 'Theater',
    values: [
      {
        fields: createEmptyColumnArray(),
        attachments: [],
      },
    ],
    section_id: '',
  },
  {
    section_type: SectionType.TABLE,
    title: 'Modeling',
    values: [
      {
        fields: createEmptyColumnArray(),
        attachments: [],
      },
    ],
    section_id: '',
  },
];

const initialState: IResumeState = {
  sections: initialSections,
  oldSections: initialSections,
  isSectionShowYear: true,
};
export const resumeSlicer = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setSection(state: IResumeState, action: PayloadAction<{ sections: ISection[] }>) {
      const { sections } = action.payload;
      state.sections = sections;
      state.oldSections = sections;
    },
    resetSection(state: IResumeState) {
      state.sections = state.oldSections;
    },
    createNewSection(state: IResumeState, action: PayloadAction<{ type: SectionType }>) {
      if (action.payload.type === SectionType.TABLE) {
        state.sections.push({
          section_type: SectionType.TABLE,
          sequence: state.sections.length + 1,
          values: [{ fields: createEmptyColumnArray(), attachments: [] }],
          title: '',
          section_id: generateSectionId(),
        });
      } else {
        state.sections.push({
          section_type: SectionType.TEXTAREA,
          sequence: state.sections.length + 1,
          title: '',
          section_id: generateSectionId(),
          values: [{ fields: [], attachments: [] }],
        });
      }
    },
    removeSection(state: IResumeState, action: PayloadAction<{ sectionIndex: number }>) {
      const { sectionIndex } = action.payload;
      const filteredSections = state.sections.filter((_, index) => index !== sectionIndex);
      state.sections = filteredSections;
    },
    reorderSection(state: IResumeState, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) {
      const { sourceIndex, destinationIndex } = action.payload;
      const sections = state.sections;
      const swappedArray = arrayMove(sections, sourceIndex, destinationIndex);
      state.sections = swappedArray;
    },
    addNewRow(state: IResumeState, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      const getSection = state.sections.filter((_, i) => i === index)[0];
      if (getSection.values) {
        const newValues: ISectionValues[] = [
          {
            fields: createEmptyColumnArray(),
            attachments: [],
          },
        ];
        const updatedValues = [...newValues, ...getSection.values];

        const updatedSection: ISection = { ...getSection, values: updatedValues };
        const updatedSections = state.sections.map((section, i) => {
          return i === index ? updatedSection : section;
        });
        state.sections = updatedSections;
      }
    },
    removeRow(state: IResumeState, action: PayloadAction<{ sectionIndex: number; rowIndex: number }>) {
      const { sectionIndex, rowIndex } = action.payload;
      const getSection = state.sections.filter((_, i) => i === sectionIndex)[0];
      if (getSection.values.length > 1) {
        const filteredValues = getSection.values.filter((_, i) => i !== rowIndex);
        const updatedSection: ISection = { ...getSection, values: filteredValues };
        const updatedSections = state.sections.map((section, i) => {
          return i === sectionIndex ? updatedSection : section;
        });
        state.sections = updatedSections;
      }
    },
    reorderRow(
      state: IResumeState,
      action: PayloadAction<{ sectionIndex: number; sourceIndex: number; destinationIndex: number }>,
    ) {
      const { sectionIndex, sourceIndex, destinationIndex } = action.payload;
      const getSection = state.sections.filter((section, index) => index === sectionIndex)[0];
      if (getSection.values) {
        const arrayText = getSection.values;
        const swappedArray = arrayMove(arrayText, sourceIndex, destinationIndex);
        const updatedSection: ISection = { ...getSection, values: swappedArray };
        const updatedSections = state.sections.map((section, index) => {
          return index === sectionIndex ? updatedSection : section;
        });
        state.sections = updatedSections;
      }
    },
    changeTextValues(
      state: IResumeState,
      action: PayloadAction<{ sectionIndex: number; rowIndex: number; columnIndex: number; value: string }>,
    ) {
      const { sectionIndex, rowIndex, columnIndex, value } = action.payload;
      const getSection = state.sections.filter((section, index) => index === sectionIndex)[0];

      const getValues = getSection.values;
      const updatedValues: ISectionValues[] = getValues.map((row, rIndex) => {
        if (rowIndex !== rIndex) {
          return row;
        }
        const newFields = row.fields.map((col, colIndex) => {
          return colIndex !== columnIndex ? col : value;
        });
        return {
          ...row,
          fields: newFields,
        };
      });
      const updatedSection: ISection = { ...getSection, values: updatedValues };
      const updatedSections = state.sections.map((section, index) => {
        return index === sectionIndex ? updatedSection : section;
      });
      state.sections = updatedSections;
    },
    changeSectionTitle(state: IResumeState, action: PayloadAction<{ sectionIndex: number; value: string }>) {
      const { sectionIndex, value } = action.payload;
      const updatedSections = state.sections.map((section, index) => {
        return index === sectionIndex ? { ...section, title: value } : section;
      });
      state.sections = updatedSections;
    },
    toggleShowYear(state: IResumeState) {
      state.isSectionShowYear = !state.isSectionShowYear;
    },
  },
});

export const selectResumeState = (state: RootState) => state.resume;

export const {
  setSection,
  resetSection,
  createNewSection,
  removeSection,
  reorderSection,
  addNewRow,
  removeRow,
  reorderRow,
  changeTextValues,
  toggleShowYear,
  changeSectionTitle,
} = resumeSlicer.actions;

export default resumeSlicer.reducer;
