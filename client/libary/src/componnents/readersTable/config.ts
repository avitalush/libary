import { LibReader } from "../../interfaces";
import DeleteIcon from '@mui/icons-material/Delete';
export const columns = [
  { id: 'Frist_Name', label: 'First Name', minWidth: 100, align: 'center' },
  { id: 'Last_Name', label: 'Last Name', minWidth: 170, align: 'center' },
  { id: 'Age', label: 'Age', minWidth: 170, align: 'center' },
  { id: 'code', label: 'קוד', minWidth: 100, align: 'center' },
  { id: 'delete', label: 'Delete', minWidth: 50, align: 'center' }, // עמודה חדשה עם אייקון של פח
];

  const createData = (code: number, Frist_Name: string, Last_Name: string, Age: string) => {
    return { code, Frist_Name, Last_Name, Age}; 
  };
  export const convertData=(data:LibReader[])=>{
  
    const rowData=data.map((item: LibReader) =>
    createData(item.id, item.first_name, item.last_name, item.age))
        return rowData;
  
}