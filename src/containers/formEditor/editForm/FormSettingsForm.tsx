import React, { useEffect, useState } from 'react'
import {
  Dialog,
  MenuItem,
  TextField,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListSubheader,
  ListItem,
} from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { selectMediaFiles } from '../../../selectors/media'
import { uploadMediaFile } from '../../../services/media'
import { FormType } from '../../../types/forms'
import FormStyles from './FormStyles'
import { getMedia, uploadMedia } from '../../../actions/media'

export const SelectBackgroundDialog = ({
  open,
  onClose,
  setBackgroundImage,
}: any) => {
  const [newBackgroud, setNewBackground] = useState<any>(null)
  const mediaFiles = useSelector(selectMediaFiles)
  const [fileToUpload, setFileToUpload] = useState<any>(null)
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(getMedia())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const onFileChange = (e: any) => {
    console.log(e.target.files[0])
    setFileToUpload(e.target.files[0])
  }

  const handleUpload = async () => {
    dispatch(uploadMedia(fileToUpload))
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select background media</DialogTitle>
      <DialogContent>
        <Typography>Upload file</Typography>
        <input type="file" onChange={onFileChange} />
        <br />
        {fileToUpload && <Button onClick={handleUpload}>Upload</Button>}
        <br />
        <Typography>User media</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {mediaFiles &&
            mediaFiles.map((file: any, index: number) => {
              return (
                <Box
                  key={index}
                  onClick={() => setNewBackground(file)}
                  sx={{
                    cursor: 'pointer',
                    boxShadow:
                      file.url === newBackgroud?.url
                        ? '1px 1px 4px 4px rgba(161, 216, 255)'
                        : 'none',
                  }}
                >
                  <img
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      width: '70px',
                      height: '70px',
                    }}
                    src={file.url}
                    alt={file.name}
                  />
                </Box>
              )
            })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={!newBackgroud}
          onClick={() => {
            setBackgroundImage(newBackgroud)
            onClose()
          }}
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const FormSettingsForm = ({ form, formId }: any) => {
  const [dialogs, setDialogs] = useState({
    uploadImage: false,
    changeFormType: false,
  })
  const [upcomingFormType, setUpcomingFormType] = useState<any>(null)
  const dispatch = useDispatch()

  const [file, setFile] = useState<any>(null)
  const { formType } = form

  const onChange = (key: any, value: any) => {
    dispatch({
      type: 'FORM_EDITOR/SET_FORM_PROPERTY',
      payload: { key, value },
    })
  }

  const closeDialog = (dialogName: string) =>
    setDialogs((prev) => ({
      ...prev,
      [dialogName]: false,
    }))

  const handleFileChange = (e: any) => {
    console.log('somethis ', e.target?.files[0])
    setFile(e.target?.files[0])
  }

  const handleUploadFile = async () => {
    await uploadMediaFile(file)
  }

  const handleFormTypeChangeConfirmation = (newType: string) => {
    setUpcomingFormType(newType)
    setDialogs((prev) => ({ ...prev, changeFormType: true }))
  }

  const handleConfirmNewFormType = () => {
    console.log('new type ', upcomingFormType)
    onChange('formType', upcomingFormType)
    setDialogs((prev) => ({ ...prev, changeFormType: false }))
  }

  return (
    <List dense>
      <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>
        Form type
      </ListSubheader>
      <ListItem>
        <TextField
          disabled
          select
          value={formType}
          onChange={(e) => handleFormTypeChangeConfirmation(e.target.value)}
          size="small"
          variant="standard"
        >
          <MenuItem value={FormType.singlePage}>Single page</MenuItem>
          <MenuItem value={FormType.slides}>Slides</MenuItem>
        </TextField>
      </ListItem>
      <ListSubheader sx={{ bgcolor: 'rgba(0, 0, 0, 0)' }}>Styles</ListSubheader>
      <FormStyles />

      <Dialog
        open={dialogs['uploadImage']}
        onClose={() => closeDialog('uploadImage')}
      >
        <DialogTitle>Upload image</DialogTitle>
        <input type="file" onChange={handleFileChange} />
        <Button onClick={handleUploadFile} disabled={!file}>
          Upload
        </Button>
      </Dialog>
      <Dialog
        open={dialogs['changeFormType']}
        onClose={() => closeDialog('changeFormType')}
      >
        <DialogTitle>Change form type</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to change form type?</Typography>
          <Typography>
            You will lose existing thing about previous form type.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog('changeFormType')}>Cancel</Button>
          <Button onClick={handleConfirmNewFormType} variant="contained">
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </List>
  )
}

export default FormSettingsForm
