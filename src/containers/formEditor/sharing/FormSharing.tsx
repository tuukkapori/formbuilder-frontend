import {
  Paper,
  Typography,
  TextField,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Box } from '@mui/system'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { publishForm, unpublishForm } from '../../../actions/formEditor'
import { successNotification } from '../../../actions/notifications'

const styles = {
  paper: {
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 2,
    height: '300px',
    alignItems: 'center',
  },
}

const FormSharing = ({ formId, form }: any) => {
  const [dialogs, setDialogs] = useState({
    unpublishConfirmation: false,
  })
  const dispatch = useDispatch()

  const published = form?.status === 'open'

  const handlePublishForm = () => {
    dispatch(publishForm(formId))
  }

  const handleUnpublishForm = async () => {
    dispatch(unpublishForm(formId))
    setDialogs((prev) => ({ ...prev, unpublishConfirmation: false }))
  }

  const link = process.env.REACT_APP_HOSTING_URL + '/v1/' + formId
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link)
    dispatch(successNotification('Link copied to clip board'))
  }
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={styles.paper}>
        {published ? (
          <Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <RocketLaunchIcon />
              <Typography variant="h5">Form is published!</Typography>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <VisibilityOffIcon />
              <Typography variant="h5">Form is not published</Typography>
            </Box>
          </Box>
        )}

        <ButtonGroup>
          <Button
            variant="contained"
            color={published ? 'error' : 'primary'}
            onClick={
              published
                ? () =>
                    setDialogs((prev) => ({
                      ...prev,
                      unpublishConfirmation: true,
                    }))
                : handlePublishForm
            }
          >
            {published ? 'Unpublish' : 'Publish'}
          </Button>
        </ButtonGroup>

        {published && (
          <Box>
            <Typography variant="subtitle1">Form URL</Typography>
            <Box sx={{ display: 'flex' }}>
              <TextField size="small" sx={{ width: 300 }} value={link} />
              <Button variant="contained" onClick={handleCopyLink}>
                Copy link
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
      <Dialog
        open={dialogs['unpublishConfirmation']}
        onClose={() =>
          setDialogs((prev) => ({ ...prev, unpublishConfirmation: false }))
        }
      >
        <DialogTitle>Unpublish Form?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to unpublish form? </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() =>
              setDialogs((prev) => ({ ...prev, unpublishConfirmation: false }))
            }
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleUnpublishForm}
          >
            Unpublish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FormSharing
