export interface Column {
  id: 'name' | 'code' | 'population' | 'size';
  label: string;
  minWidth?: number;
  align?: 'right';
}

export const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'size',
    label: 'Size',
    minWidth: 170,
    align: 'right',
  },
];

export interface Data {
  [key: string]: string | number;
  name: string;
  code: string;
  population: number;
  size: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  return { name, code, population, size };
}

export type OriginalRows = {
  [key: string]: string | number;
  name: string;
  code: string;
  population: number;
  size: number;
};
export const originalRows: OriginalRows[] = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

// export function isNumeric(str: { str: string }): boolean {
//   return /^-?\d+$/.test(str);
// }
