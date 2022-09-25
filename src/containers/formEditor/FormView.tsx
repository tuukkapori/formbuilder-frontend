import React, { useEffect, useState } from 'react'
import {
  Button,
  Tab,
  Tabs,
  Typography,
  Box,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectEditorForm,
  selectEditorFormPublished,
  selectEditorSubmitting,
  selectEditorUnsavedChanges,
} from '../../selectors/formEditor'
import { useParams } from 'react-router'
import EditForm from './editForm/EditForm'
import FormSharing from './sharing/FormSharing'
import { Link, useSearchParams } from 'react-router-dom'
import {
  initFormEditor,
  resetFormEditor,
  saveChanges,
} from '../../actions/formEditor'
import { getAnswersForForm } from '../../actions/forms'
import { initPubSub, unsubPubSub } from '../../actions/pubSub'
import Integrations from './integrations/Integrations'
import Answers from './answers/Answers'
import TabPanel from '../../components/common/TabPanel'

const styles = {
  mainContainer: {
    bgcolor: '#fafafa',
    position: 'relative' as 'relative',
    height: 'calc(100vh - 90px)',
    overflowY: 'scroll',
  },
  progress: {
    position: 'absolute' as 'absolute',
    zIndex: 10000,
    top: -2,
    left: 0,
    right: 0,
  },
  titleBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100vw',
    padding: '5px 40px 5px 40px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    bgcolor: 'white',
    alignItems: 'center',
  },
}

const FormView = () => {
  const form = useSelector(selectEditorForm)
  const [dialogs, setDialogs] = useState({
    savingWarning: false,
  })

  const { formId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabs = ['answers', 'editForm', 'integrations', 'sharing']
  const tab = searchParams.get('tab') as any

  const dispatch = useDispatch()

  const unsavedChanges = useSelector(selectEditorUnsavedChanges)
  const isSubmitting = useSelector(selectEditorSubmitting)
  const isPublished = useSelector(selectEditorFormPublished)

  const closeDialog = (dialogName: string) => {
    setDialogs((prev) => ({ ...prev, [dialogName]: false }))
  }

  useEffect(() => {
    dispatch(initFormEditor(formId))
    dispatch(getAnswersForForm(formId))
    dispatch(initPubSub())

    return () => {
      dispatch(resetFormEditor())
      dispatch(unsubPubSub())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSaveFormChanges = () => {
    if (isPublished) {
      setDialogs((prev) => ({ ...prev, savingWarning: true }))
    } else {
      dispatch(saveChanges(formId))
    }
  }

  if (!form || !formId) {
    return <LinearProgress />
  }

  return (
    <>
      <Box sx={styles.mainContainer}>
        {isSubmitting && <LinearProgress style={styles.progress} />}

        <Box sx={styles.titleBar}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link to="/forms" style={{ color: 'black' }}>
              <Typography>Forms </Typography>
            </Link>
            <Typography>/</Typography>
            <Typography>{form.name}</Typography>
          </Box>

          <Box>
            <Tabs
              value={tabs.indexOf(tab)}
              onChange={(_: any, index: number) =>
                setSearchParams({ tab: tabs[index] })
              }
            >
              <Tab label="Answers" />
              <Tab label="Edit Form" />
              <Tab label="Integrations" />
              <Tab label="Sharing" />
            </Tabs>
          </Box>
          <Button
            variant="contained"
            disabled={isSubmitting || !unsavedChanges}
            onClick={handleSaveFormChanges}
          >
            Save
          </Button>
        </Box>
        <TabPanel value={tabs.indexOf(tab)} index={0}>
          <Answers formId={formId} form={form} />
        </TabPanel>
        <TabPanel value={tabs.indexOf(tab)} index={1}>
          <EditForm form={form} />
        </TabPanel>
        <TabPanel value={tabs.indexOf(tab)} index={2}>
          <Integrations formId={formId} form={form} />
        </TabPanel>
        <TabPanel value={tabs.indexOf(tab)} index={3}>
          <FormSharing formId={formId} form={form} />
        </TabPanel>
        <Dialog
          open={dialogs['savingWarning']}
          onClose={() => closeDialog('savingWarning')}
        >
          <DialogTitle>Error while saving</DialogTitle>
          <DialogContent>
            <Typography>
              Cant mofify form while its published. Unpublish form to save
              changes
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeDialog('savingWarning')}>OK!</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  )
}

export default FormView
