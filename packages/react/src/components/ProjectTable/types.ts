export type CellData = {
  key: string;
  initialValue: string;
  rowIndex: number;
  colIndex: number;
  onSave?: (value: string) => void;
};

export type RowData = {
  key: string;
  index: number;
  link: string;
  cells: CellData[];
};