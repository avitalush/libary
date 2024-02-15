import { LibPublisher } from '../../interfaces'

export const columns = [
  { id: 'name', label: 'Name', minWidth: 100, align: 'center' },
  { id: 'address', label: 'Address', minWidth: 170, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'center' },
]
function createData(
  code: string,
  name: string,
  address: string,
  email: string,
) {
  return { code, name, address, email }
}
export const convertData = (data: LibPublisher[]) => {
  const rowData = data.map((item: LibPublisher) =>
    createData(item.id, item.name, item.address, item.email),
  )
  return rowData
}
