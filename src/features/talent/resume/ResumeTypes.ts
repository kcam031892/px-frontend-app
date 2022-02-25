export enum Direction {
  Up,
  Down,
}

export enum ResumeSectionType {
  Table,
  TextArea,
}

export interface ResumeSection {
  sequence: number;
  sectionId: number;
  title: string;
  sectionType: ResumeSectionType;
  rowCount?: number;
  columnCount?: number;
  paragraphText?: string;
  texts?: ResumeTextItem[];
}

export interface ResumeTextItem {
  columnIndex: number;
  rowIndex: number;
  text: string;
}

export interface ResumeSectionAction {
  onRemove: any;
  onReOrder: any;
  onChangeText: any;
  onDeleteTableRow: any;
  onChangeTableConfig: any;
  onChangeTitle: any;
  onReorderTableRow: any;
}

export interface ResumeState {
  model: ResumeModel;
}

export interface ResumeModel {
  profileId: string;
  sections: ResumeSection[];
}
