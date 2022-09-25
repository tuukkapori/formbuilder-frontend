import { handleActions } from 'redux-actions'
import type { Reducer } from '@reduxjs/toolkit'
import { Action } from '../types/actions'
import {
  addFormField,
  deleteFormField,
  initFormEditorSuccess,
  publishFormSuccess,
  selectFormField,
  setAfterSubmitProperty,
  setFieldProperty,
  setMainTitleStyleProperty,
  setMainDescriptionStyleProperty,
  setOpeningScreenProperty,
  unpublishFormSuccess,
  setFieldTitleStyleProperty,
  setMainButtonStyleProperty,
  setFormBackgroundProperty,
  setQuestionOptionProperty,
  setFormEditorSubmitting,
  saveChangesSuccess,
  setFormOpeningScreenStyleProperty,
  setFormAfterSubmitStyleProperty,
  resetFormEditor,
  setFieldInputStyleProperty,
} from '../actions/formEditor'
import { getEditorFormIntegrationsSuccess } from '../actions/integrations'
import { FormField, FormStatus } from '../types/forms'
import { FormEditorState, Integrations } from '../types/state'
import {
  InitFormEditorPayload,
  SetFieldPropertyPayload,
  SetPropertyPayload,
} from '../types/actions/formEditorActions'

const initialState: FormEditorState = {
  form: undefined as any,
  integrations: undefined as any,
  unsavedChanges: false,
  submitting: false,
  selectedField: 'openingScreen',
}

const formEditorReducer = handleActions<FormEditorState, any>(
  {
    [initFormEditorSuccess]: (
      state,
      { payload: { form, integrations } }: Action<InitFormEditorPayload>
    ) => ({
      ...state,
      form,
      integrations,
    }),
    [getEditorFormIntegrationsSuccess]: (
      state,
      { payload: integrations }: Action<Integrations>
    ) => ({
      ...state,
      integrations,
    }),
    [resetFormEditor]: () => ({
      ...initialState,
    }),
    [publishFormSuccess]: (state) => ({
      ...state,
      form: {
        ...state.form,
        status: FormStatus.open,
      },
    }),
    [unpublishFormSuccess]: (state) => ({
      ...state,
      form: {
        ...state.form,
        status: FormStatus.closed,
      },
    }),
    [selectFormField]: (state, { payload: selectedField }: Action<string>) => ({
      ...state,
      selectedField,
    }),
    [addFormField]: (state, { payload: field }: Action<FormField>) => ({
      ...state,
      form: {
        ...state.form,
        fields: [...state.form.fields, field],
      },
      unsavedChanges: true,
    }),
    [deleteFormField]: (state, { payload: fieldId }: Action<string>) => ({
      ...state,
      form: {
        ...state.form,
        fields: state.form.fields.filter((field) => field.id !== fieldId),
      },
      unsavedChanges: true,
    }),
    [setFieldProperty]: (
      state,
      { payload: { fieldId, key, value } }: Action<SetFieldPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        fields: state.form.fields.map((field) => {
          if (field.id !== fieldId) {
            return field
          } else {
            return {
              ...field,
              [key]: value,
            }
          }
        }),
      },
      unsavedChanges: true,
    }),
    [setOpeningScreenProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        openingScreen: {
          ...state.form.openingScreen,
          [key]: value,
        },
      },
      unsavedChanges: true,
    }),
    [setAfterSubmitProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        afterSubmit: {
          ...state.form.afterSubmit,
          [key]: value,
        },
      },
      unsavedChanges: true,
    }),
    [setMainTitleStyleProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          main: {
            ...state.form.styles.main,
            title: {
              ...state.form.styles.main.title,
              [key]: value,
            },
          },
        },
      },
      unsavedChanges: true,
    }),
    [setMainDescriptionStyleProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          main: {
            ...state.form.styles.main,
            description: {
              ...state.form.styles.main.description,
              [key]: value,
            },
          },
        },
      },
      unsavedChanges: true,
    }),
    [setMainButtonStyleProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          main: {
            ...state.form.styles.main,
            button: {
              ...state.form.styles.main.button,
              [key]: value,
            },
          },
        },
      },
      unsavedChanges: true,
    }),
    [setFieldTitleStyleProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          fields: {
            ...state.form.styles.fields,
            title: {
              ...state.form.styles.fields.title,
              [key]: value,
            },
          },
        },
      },
      unsavedChanges: true,
    }),
    [setFormBackgroundProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          background: {
            ...state.form.styles.background,
            [key]: value,
          },
        },
      },
      unsavedChanges: true,
    }),
    [setQuestionOptionProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          fields: {
            ...state.form.styles.fields,
            options: {
              ...state.form.styles.fields.options,
              [key]: value,
            },
          },
        },
      },
      unsavedChanges: true,
    }),
    [setFormEditorSubmitting]: (
      state,
      { payload: submitting }: Action<boolean>
    ) => ({
      ...state,
      submitting,
    }),
    [saveChangesSuccess]: (state) => ({
      ...state,
      unsavedChanges: false,
    }),
    [setFormOpeningScreenStyleProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          openingScreen: {
            ...state.form.styles.openingScreen,
            [key]: value,
          },
        },
      },
      unsavedChanges: true,
    }),
    [setFormAfterSubmitStyleProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          afterSubmit: {
            ...state.form.styles.afterSubmit,
            [key]: value,
          },
        },
      },
      unsavedChanges: true,
    }),
    [setFieldInputStyleProperty]: (
      state,
      { payload: { key, value } }: Action<SetPropertyPayload>
    ) => ({
      ...state,
      form: {
        ...state.form,
        styles: {
          ...state.form.styles,
          fields: {
            ...state.form.styles.fields,
            input: {
              ...state.form.styles.fields.input,
              [key]: value,
            },
          },
        },
      },
      unsavedChanges: true,
    }),
  },
  { ...initialState }
) as Reducer

export default formEditorReducer
