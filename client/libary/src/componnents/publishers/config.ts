import { LibPublisher } from "../../interfaces";

export   const columns = [
    { id: 'name', label: 'name', minWidth: 100, align: 'center' },
    { id: 'address', label: 'address', minWidth: 170, align: 'center' },
    { id: 'email', label: 'email', minWidth: 170, align: 'center' },
    { id: 'code', label: 'קוד', minWidth: 100, align: 'center' },
  ];  
  function createData(code: number, name: string, address: string, email: string) {
    return { code, name, address, email };
  }
  export const convertData=(data:LibPublisher[])=>{
  
    const rowData=data.map((item: LibPublisher) =>
    createData(item.id, item.name, item.address, item.email))
    return rowData;
  
}