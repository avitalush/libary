import  React ,{useEffect,useState}from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ChartsTextStyle } from '@mui/x-charts/ChartsText';
import { DataGraph, Top_Books } from '../interfaces';
import {  getDataGraph } from '../api/borrowing';
import { convertData } from './top_books/config';
import Box from '@mui/material/Box';
import { styles } from './top_books/style';



export default function Chart() {
  const theme = useTheme();

  const [data, setData] = useState<DataGraph[]>([]);

useEffect(() => {
    const fetchDataAndSetRows = async () => {
      const response = await getDataGraph();
   setData(convertData( response.topBorrowedBooks));
    };
    fetchDataAndSetRows();
  }, []);

  return (
    <>
      Top
      <Box style={styles.box}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'bookName',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            },
          ]}
          yAxis={[
            {
              label: 'Amount',
              labelStyle: {
                ...(theme.typography.body1 as ChartsTextStyle),
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              min: 0, 
              tickNumber: 6,
              max: 50,
            },
          ]}
          series={[
            {
              dataKey: 'count',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </Box>
    </>
  );
}
