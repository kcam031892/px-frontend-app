export interface IComposite {
  template_id: number;
  images: {
    id: string;
    url: string;
  }[];
}
export const INITIAL_COMPOSITE_STATES: IComposite[] = [
  {
    template_id: 1,
    images: [
      { id: '', url: '' },
      { id: '', url: '' },
      { id: '', url: '' },
      { id: '', url: '' },
      { id: '', url: '' },
    ],
  },
  {
    template_id: 2,
    images: [
      { id: '', url: '' },
      { id: '', url: '' },
    ],
  },
  {
    template_id: 3,
    images: [
      { id: '', url: '' },
      { id: '', url: '' },
      { id: '', url: '' },
      { id: '', url: '' },
      { id: '', url: '' },
      { id: '', url: '' },
    ],
  },
];
