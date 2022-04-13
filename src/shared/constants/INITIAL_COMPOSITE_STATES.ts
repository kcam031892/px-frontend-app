export interface IComposite {
  template_id: number;
  images: string[];
}
export const INITIAL_COMPOSITE_STATES: IComposite[] = [
  {
    template_id: 1,
    images: ['', '', '', '', ''],
  },
  {
    template_id: 2,
    images: ['', ''],
  },
  {
    template_id: 3,
    images: ['', '', '', '', '', ''],
  },
];
