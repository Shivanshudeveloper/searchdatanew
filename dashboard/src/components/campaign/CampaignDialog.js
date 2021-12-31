import React from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const CampaignDialog = (props) => {
  const { toggleDialog, isOpen, changeText } = props
  const { createCampaign } = props

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Create Campaign</DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        <DialogContentText>Provide a name for your campaign!</DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Campaign Name'
          type='text'
          fullWidth
          variant='standard'
          onChange={(e) => changeText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog}>Cancel</Button>
        <Button onClick={createCampaign}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CampaignDialog
