import React from 'react'
import { Typography, Box } from '@mui/material'

const StyledHeader = ({ text }) => {
  return (
    <Box sx={{ textAlign: 'center', margin: '20px 0', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
      <Typography variant='h4' component='h1' sx={{ color: '#3f51b5' }}>
        {text}
      </Typography>
    </Box>
  )
}

export default StyledHeader
