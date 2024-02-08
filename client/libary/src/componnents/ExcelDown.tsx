import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { getReportData } from '../api/publisher';
import { PublisherPayment } from '../interfaces';

export default function ExcelDownloadButton  () {
    const [data, setData] = useState<PublisherPayment[]>([]);
    useEffect(() => {
        const fetchData = async () => {
    
            const response: PublisherPayment[]  = await getReportData();
            setData(response);
        
        };
      
        fetchData();
      }, []);
  const downloadExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert the data array to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate a binary string from the workbook
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Convert the binary string to a Blob
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Create a download link
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = "report" + '.xlsx';

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <button onClick={downloadExcel}>
      Download Report
    </button>
  );
}