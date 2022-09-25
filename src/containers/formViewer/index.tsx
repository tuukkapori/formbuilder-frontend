import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { PublicAPI } from '../../services/api'
import FormContainer from './FormContainer'
import MultipageForm from './MultipageForm'
import AIClogo from '../../images/AIC_logo_black.png'
import { CircularProgress, Typography } from '@mui/material'

interface FormViewerProps {
  previewForm?: any
  previewMode?: boolean
  selectedField?: number
}

const FormViewer = ({
  previewMode,
  selectedField,
  previewForm,
}: FormViewerProps) => {
  const { formId } = useParams()
  const [formFromApi, setFormFromApi] = useState<any>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getForm = async (formId: string) => {
      try {
        const data = await PublicAPI.GET(`/forms/${formId}`)
        console.log('data ', data)
        setFormFromApi(data.form)
      } catch (error) {
        setError(true)
      }
    }

    if (formId && !previewForm) {
      getForm(formId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = previewMode ? previewForm : formFromApi

  const mainStyle = previewMode
    ? { width: '100%', height: '100%' }
    : { width: '100vw', height: '100vh' }

  return (
    <div style={{ position: 'relative', ...mainStyle }}>
      <AnimatePresence>
        {!previewMode && !form && (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              position: 'absolute',
              zIndex: 1000,
              background: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '130px',
                gap: 15,
              }}
            >
              {!error && (
                <motion.div
                  key="loader"
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <CircularProgress sx={{ color: 'black' }} />
                </motion.div>
              )}
              {error && (
                <motion.div
                  key="not-availble"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Typography>Form is not available.</Typography>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        {form && (
          <FormContainer form={form}>
            {form.formType === 'slides' && (
              <MultipageForm
                form={previewForm || form}
                previewMode={previewMode}
                selectedField={selectedField}
              />
            )}
          </FormContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FormViewer
