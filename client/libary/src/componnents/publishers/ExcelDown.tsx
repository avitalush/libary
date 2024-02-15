import { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'
import { getReportData } from '../../Api/publisher'
import { PublisherPayment } from '../../interfaces'
import Button from '@mui/material/Button'

export default function ExcelDownloadButton() {
  const [data, setData] = useState<PublisherPayment[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response: PublisherPayment[] = await getReportData()
      setData(response)
    }

    fetchData()
  }, [])
  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new()

    const worksheet = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'report' + '.xlsx'

    document.body.appendChild(link)

    link.click()

    URL.revokeObjectURL(url)
    document.body.removeChild(link)
  }

  return <Button onClick={downloadExcel}>Download Report</Button>
}
