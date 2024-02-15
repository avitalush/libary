import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

interface FiltersComponentProps {
  handleNameFilterChange: (value: string) => void
  nameFilter: string
}

const FiltersComponent: React.FC<FiltersComponentProps> = ({
  handleNameFilterChange,
  nameFilter,
}) => {
  return (
    <Box
      sx={{
        mb: 5,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <TextField
        label="Search by Name"
        variant="outlined"
        size="small"
        value={nameFilter}
        onChange={(e) => handleNameFilterChange(e.target.value)}
      />
    </Box>
  )
}

export default FiltersComponent
