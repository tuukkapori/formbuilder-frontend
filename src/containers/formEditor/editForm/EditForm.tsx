import React, { useState } from 'react'
import { IconButton, Tab, Tabs, ButtonGroup, Paper } from '@mui/material'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import LaptopIcon from '@mui/icons-material/Laptop'
import { useParams } from 'react-router'
import FieldSettingsForm from './FieldSettingsForm'
import FormSettingsForm from './FormSettingsForm'
import FormFields from './FormFields'
import TabPanel from '../../../components/common/TabPanel'
import FormViewer from '../../formViewer'
import { useSelector } from 'react-redux'
import { selectEditorSelectedField } from '../../../selectors/formEditor'

const styles = {
  mainContainer: {
    display: 'flex',
    width: '100vw',
    position: 'relative',
    height: 'calc(100vh - 149px)',
  } as any,
  sideBar: {
    width: '20%',
    minWidth: '100px',
    maxWidth: '250px',
    borderRight: '1px solid rgba(0, 0, 0, 0.2)',
    background: 'white',
    height: '100%',
    overflow: 'scroll',
  },
}

const getFormPreviewLaptopDimensions = () => {
  const maxWidth = window.innerWidth * 0.7
  const height = (maxWidth * 9) / 16
  const finalHeight = Math.min(height, window.innerHeight * 0.8)
  const finalWidth = Math.min(maxWidth, (finalHeight * 16) / 9)
  return { width: finalWidth, height: finalHeight }
}

const getFormPreviewMobileDimensions = () => {
  const maxWidth = window.innerWidth * 0.6
  const height = (maxWidth * 19) / 9
  const finalHeight = Math.min(height, window.innerHeight * 0.7)
  const finalWidth = Math.min(maxWidth, (finalHeight * 9) / 19)
  return { width: finalWidth, height: finalHeight }
}

const EditForm = ({ form }: any) => {
  const [settingsTab, setSettingsTab] = useState(1)
  const [formPreviewMode, setFormPreviewMode] = useState('desktop')
  const { formId } = useParams()

  const selectedFieldId = useSelector(selectEditorSelectedField)

  const getSelectedField = () => {
    if (!selectedFieldId || selectedFieldId === 'openingScreen') {
      return 0
    } else if (selectedFieldId === 'afterSubmit') {
      return form.fields.length + 1
    } else {
      const field = form.fields.find(
        (field: any) => field.id === selectedFieldId
      )
      return form.fields.indexOf(field) + 1
    }
  }

  const getFormPreviewDimensions = () => {
    const dimensions =
      formPreviewMode === 'mobile'
        ? getFormPreviewMobileDimensions()
        : getFormPreviewLaptopDimensions()

    return dimensions
  }

  if (!form) {
    return <div>loading..</div>
  }
  return (
    <div style={styles.mainContainer}>
      <div style={styles.sideBar}>
        <FormFields form={form} />
      </div>
      <div
        style={{
          width: '60%',
          padding: '20px',
          flexGrow: 1,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <ButtonGroup>
            <IconButton
              sx={{ color: formPreviewMode === 'mobile' ? 'blue' : '' }}
              onClick={() => setFormPreviewMode('mobile')}
            >
              <PhoneIphoneIcon />
            </IconButton>
            <IconButton
              sx={{ color: formPreviewMode === 'desktop' ? 'blue' : '' }}
              onClick={() => setFormPreviewMode('desktop')}
            >
              <LaptopIcon />
            </IconButton>
          </ButtonGroup>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            sx={{
              overflow: 'hidden',
              ...getFormPreviewDimensions(),
            }}
          >
            <FormViewer
              previewForm={form}
              previewMode={true}
              selectedField={getSelectedField()}
            />
          </Paper>
        </div>
      </div>
      <div style={styles.sideBar}>
        <Tabs
          variant="fullWidth"
          value={settingsTab}
          onChange={(_: any, newVal: number) => setSettingsTab(newVal)}
        >
          <Tab label="Field settings" />
          <Tab label="Form settings" />
        </Tabs>
        <TabPanel value={settingsTab} index={0}>
          <FieldSettingsForm />
        </TabPanel>
        <TabPanel value={settingsTab} index={1}>
          <FormSettingsForm form={form} formId={formId} />
        </TabPanel>
      </div>
    </div>
  )
}

export default EditForm
