import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const SnackMessage = (props) => {
  const { variant, message, snackOpen, handleSnackClose } = props
  return (
    <Snackbar
      open={snackOpen}
      autoHideDuration={4000}
      onClose={handleSnackClose}
    >
      <Alert
        onClose={handleSnackClose}
        severity={variant}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackMessage
