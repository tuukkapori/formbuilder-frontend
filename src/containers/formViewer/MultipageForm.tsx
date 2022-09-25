import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Typography, CircularProgress } from '@mui/material'
import { Form, Field } from 'react-final-form'
import {
  getInputTitleColor,
  getInputTitleStyles,
  getMainDescriptionStyles,
  getMainTitleStyles,
} from '../../services/forms/styles'
import FormButton from '../../components/button/FormButton'
import { useParams } from 'react-router'
import axios from 'axios'
import RenderFormField from '../../components/forms/RenderFormField'

interface MultipageFormProps {
  form: any
  previewMode?: boolean
  selectedField?: number
}

const MultipageForm = ({
  form,
  previewMode,
  selectedField,
}: MultipageFormProps) => {
  const [page, setPage] = useState(0)

  // 0 being down, 1 being up
  const [scrollDirection, setScrollDirection] = useState(0)

  const [errors, setErrors] = useState<any>({})
  const [submitError, setSubmitError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { formId } = useParams()

  const handleChangeQuestion = (newPage: any, field?: any, values?: any) => {
    if (field && values && field.required && !values[field.id]) {
      errors[field.id] = 'Required'
      setErrors((prev: any) => ({
        ...prev,
        [field.id]: 'Required!',
      }))
      return
    }

    if (newPage === form.fields.length + 1) {
      submitForm(values)
      return
    }

    if (newPage < page) {
      setScrollDirection(1)
    } else {
      setScrollDirection(0)
    }
    setTimeout(() => {
      setPage(newPage)
    }, 1)
  }
  const submitForm = async (values: any) => {
    try {
      console.log('submitting form')
      setSubmitting(true)
      const url = process.env.REACT_APP_PUBLIC_API_URL + '/submit/' + formId

      await axios.post(url, {
        answers: values,
      })
      setSubmitting(false)
      setPage((prev) => prev + 1)
      return true
    } catch (error) {
      console.log('error submitting form ', error)
      setSubmitting(false)
      setSubmitError(true)
      setPage((prev) => prev + 1)
      return false
    }
  }
  useEffect(() => {
    const formElement = document.getElementById('form-element')
    const handleEnter = (e: any) => {
      const key = e.charCode || e.keyCode || 0
      if (key === 13) {
        e.preventDefault()
      }
    }
    if (formElement) {
      formElement.addEventListener('keypress', handleEnter)
    }
    return () => {
      if (formElement) {
        formElement.removeEventListener('keypress', handleEnter)
      }
    }
  }, [])

  const selectedPage = previewMode ? selectedField : page

  if (!form) {
    return <div />
  }
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '700px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AnimatePresence initial={false}>
        {selectedPage === 0 && (
          <motion.div
            key="opening-screen"
            exit={{ y: -3000 }}
            initial={{ y: -3000 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              translateX: '-50%',
              translateY: '-50%',
              width: '80%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: form?.styles?.openingScreen?.alignItems,
              textAlign: form?.styles?.openingScreen?.alignItems,
            }}
          >
            <Typography
              sx={{ marginBottom: 1, ...getMainTitleStyles(form) }}
              variant="h2"
            >
              {form.openingScreen.title}
            </Typography>
            <Typography
              sx={{ marginBottom: 3, ...getMainDescriptionStyles(form) }}
              variant="h4"
            >
              {form.openingScreen.description}
            </Typography>
            <FormButton
              onClick={() => handleChangeQuestion(1)}
              variant="contained"
              size="large"
              styles={form.styles.main.button}
            >
              {form.openingScreen.callToAction}
            </FormButton>
          </motion.div>
        )}
        <Form
          onSubmit={submitForm}
          render={({ handleSubmit, pristine, values }) => (
            <form onSubmit={handleSubmit} id="form-element">
              {form.fields.map((field: any, index: number) => {
                return (
                  <AnimatePresence key={`presence-${field.id}`}>
                    {selectedPage === index + 1 && !submitting && (
                      <motion.div
                        key={field.id + '-container'}
                        exit={
                          index + 1 === form.fields.length
                            ? { opacity: 0 }
                            : { y: scrollDirection === 0 ? -3000 : 3000 }
                        }
                        initial={{ y: scrollDirection === 0 ? 3000 : -3000 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          translateX: '-50%',
                          translateY: '-50%',
                          gap: 10,
                          zIndex: 12000,
                          width: '80%',
                          maxWidth: '500px',
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'Montserrat',
                            ...getInputTitleStyles(form),
                          }}
                        >
                          {index + 1}. {field.title} {field.required && '*'}
                        </Typography>
                        {field.description && (
                          <Typography
                            sx={{
                              opacity: 0.7,
                              fontSize: '20px',
                              color: getInputTitleColor(form),
                            }}
                          >
                            {field.description}
                          </Typography>
                        )}

                        <Field name={field.id} key={field.id + '-field'}>
                          {({
                            input: { value, onChange, onBlur },
                            meta: { error },
                          }) => {
                            return (
                              <>
                                <RenderFormField
                                  field={field}
                                  value={value}
                                  styles={form.styles}
                                  onChange={onChange}
                                  onFocus={() =>
                                    setErrors((prev: any) => ({
                                      ...prev,
                                      [field.id]: undefined,
                                    }))
                                  }
                                />
                                {errors[field.id] && (
                                  <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ color: 'red' }}
                                  >
                                    {errors[field.id]}
                                  </motion.p>
                                )}
                                <div
                                  style={{ display: 'flex', marginTop: '15px' }}
                                >
                                  <FormButton
                                    disabled={submitting}
                                    onClick={() => handleChangeQuestion(index)}
                                    styles={form.styles.main.button}
                                    variant="text"
                                  >
                                    Back
                                  </FormButton>
                                  <FormButton
                                    disabled={submitting}
                                    onClick={() => {
                                      handleChangeQuestion(
                                        index + 2,
                                        field,
                                        values
                                      )
                                    }}
                                    variant="contained"
                                    size="large"
                                    styles={form.styles.main.button}
                                  >
                                    {selectedPage === form.fields.length
                                      ? form.submitText
                                      : 'Next'}
                                  </FormButton>
                                </div>
                              </>
                            )
                          }}
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </form>
          )}
        />
        {selectedPage === form.fields.length + 1 && !submitError && (
          <motion.div
            key="after-submit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              translateX: '-50%',
              translateY: '-50%',
              width: '80%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: form?.styles?.afterSubmit?.alignItems,
              textAlign: form?.styles?.afterSubmit?.alignItems,
            }}
          >
            <Typography
              sx={{ marginBottom: 1, ...getMainTitleStyles(form) }}
              variant="h2"
            >
              {form.afterSubmit.title}
            </Typography>
            <Typography
              sx={{ marginBottom: 3, ...getMainDescriptionStyles(form) }}
              variant="h4"
            >
              {form.afterSubmit.description}
            </Typography>
          </motion.div>
        )}
        {submitting && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              translateX: '-50%',
              translateY: '-50%',
              width: '80%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: form?.styles?.afterSubmit?.alignItems,
              textAlign: form?.styles?.afterSubmit?.alignItems,
            }}
          >
            <CircularProgress
              sx={{ color: form?.styles?.main?.title?.color }}
            />
          </motion.div>
        )}
        {submitError && (
          <motion.div
            key="submit-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              translateX: '-50%',
              translateY: '-50%',
              width: '80%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: form?.styles?.afterSubmit?.alignItems,
              textAlign: form?.styles?.afterSubmit?.alignItems,
            }}
          >
            <Typography
              sx={{ marginBottom: 1, ...getMainDescriptionStyles(form) }}
              variant="h2"
            >
              An error happened while submitting. Please try again.
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MultipageForm
