import { LibReader } from '../../interfaces'
export const columns = [
  { id: 'Frist_Name', label: 'First Name', minWidth: 100, align: 'center' },
  { id: 'Last_Name', label: 'Last Name', minWidth: 170, align: 'center' },
  { id: 'Age', label: 'Age', minWidth: 170, align: 'center' },
]

const createData = (
  code: string,
  Frist_Name: string,
  Last_Name: string,
  Age: string,
) => {
  return { code, Frist_Name, Last_Name, Age }
}
export const convertData = (data: LibReader[]) => {
  const rowData = data.map((item: LibReader) =>
    createData(item.id, item.firstName, item.lastName, item.age),
  )
  return rowData
}
