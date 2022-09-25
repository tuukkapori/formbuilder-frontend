import React from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
} from '@mui/material'

interface DeleteFormDialogProps {
  open: boolean
  onClose: () => void
  formToDelete: any
  confirmDeleteForm: () => void
}

const DeleteFormDialog = ({
  open,
  onClose,
  formToDelete,
  confirmDeleteForm,
}: DeleteFormDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Form</DialogTitle>
      <DialogContent style={{ paddingTop: '20px' }}>
        <Typography>
          Are you sure you want to delete form {formToDelete?.name}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={confirmDeleteForm} color="error">
          DELETE
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteFormDialog
