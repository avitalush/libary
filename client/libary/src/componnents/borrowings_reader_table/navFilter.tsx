import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { FiltersComponentProps } from '../../interfaces';

const FiltersComponent: React.FC<FiltersComponentProps> = ({
    handleChangeValue,
  filterObject
}) => {
  return (
    <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
  label="Basic date picker"
  value={filterObject.searchBorrowDate}
  onChange={(value) => handleChangeValue('searchBorrowDate', value)}
  format="DD/MM/YYYY"
/>

      </LocalizationProvider>
      <TextField
        label="Search by Book Name"
        variant="outlined"
        size="small"
        value={filterObject.searchBookName}
        onChange={(e) => handleChangeValue('searchBookName', e.target.value)}
        />
      
    </Box>
  );
};

export default FiltersComponent;
