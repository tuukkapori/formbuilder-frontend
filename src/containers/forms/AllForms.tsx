import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
  Popover,
  Typography,
  LinearProgress,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
  selectAllFormsViewSubmitting,
  selectForms,
} from '../../selectors/forms'
import { Box } from '@mui/system'
import { MoreVert } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import CreateFormDialog from './dialogs/CreateFormDialog'
import DeleteFormDialog from './dialogs/DeleteFormDialog'
import { deleteForm, getForms } from '../../actions/forms'

const AllForms = () => {
  const [dialogs, setDialogs] = useState({
    createFormDialog: false,
    deleteForm: false,
  })
  const [formToDelete, setFormToDelete] = useState<any>(null)
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const setDialogVisibility = (dialogName: string, open: boolean) => {
    setDialogs((prev) => ({
      ...prev,
      [dialogName]: open,
    }))
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allForms = useSelector(selectForms)
  const submitting = useSelector(selectAllFormsViewSubmitting)
  const forms = Object.keys(allForms).map((key) => ({
    formId: key,
    form: allForms[key],
  }))

  const confirmDeleteForm = () => {
    dispatch(deleteForm(formToDelete))
    setDialogVisibility('deleteForm', false)
  }

  const cancelDeleteForm = () => {
    setFormToDelete(null)
    setDialogVisibility('deleteForm', false)
  }

  useEffect(() => {
    dispatch(getForms())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      {submitting && (
        <LinearProgress
          sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}
        />
      )}

      <Box sx={{ p: 3 }}>
        <Typography
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: '30px',
            mb: 2,
          }}
        >
          Forms
        </Typography>
        <Button
          onClick={() => setDialogVisibility('createFormDialog', true)}
          sx={{ mb: 2 }}
          variant="contained"
        >
          + New form
        </Button>
        {!submitting && Object.keys(forms).length === 0 && (
          <Box>
            You dont have any forms yet. Lets fix that. Press the big blue
            button.
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {forms &&
            forms.map(({ form, formId }: any) => {
              return (
                <Card
                  key={formId}
                  sx={{
                    minHeight: 200,
                    width: 150,
                    backgroundImage: `url(${form.styles?.background?.backgroundImage})`,
                    backgroundSize: 'cover',
                  }}
                >
                  <CardHeader
                    sx={{ p: 1 }}
                    action={
                      <IconButton
                        onClick={(e) => {
                          setAnchorEl(e.target)
                          setFormToDelete(formId)
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                    }
                  />
                  <CardActionArea
                    onClick={() => {
                      navigate(`/forms/${formId}?tab=editForm`)
                    }}
                  >
                    <CardContent
                      sx={{
                        height: 150,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'end',
                        p: 0,
                      }}
                    >
                      <Box
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          width: '100%',
                        }}
                        sx={{
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                          p: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: '20px',
                            color: 'white',
                          }}
                        >
                          {form?.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )
            })}
        </Box>
        <Popover
          id="form-actions-popver"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <Box sx={{ p: 1 }}>
            <Button
              onClick={() => {
                setAnchorEl(null)
                setDialogVisibility('deleteForm', true)
              }}
              color="error"
            >
              <DeleteIcon />
              Delete
            </Button>
          </Box>
        </Popover>

        <CreateFormDialog
          open={dialogs['createFormDialog']}
          onClose={() => setDialogVisibility('createFormDialog', false)}
        />
        <DeleteFormDialog
          onClose={cancelDeleteForm}
          open={dialogs['deleteForm']}
          confirmDeleteForm={confirmDeleteForm}
          formToDelete={formToDelete}
        />
      </Box>
    </Box>
  )
}

export default AllForms
