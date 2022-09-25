import { createSelector } from 'reselect'
import { FormStatus } from '../types/forms'
import { StateInterface } from '../types/state'

const selectFormEditor = (state: StateInterface) => state.formEditor

const selectEditorForm = createSelector(
  selectFormEditor,
  (editor) => editor.form
)

const selectEditorIntegrations = createSelector(
  selectFormEditor,
  (editor) => editor.integrations
)

const selectEditorSubmitting = createSelector(
  selectFormEditor,
  (editor) => editor.submitting
)

const selectEditorUnsavedChanges = createSelector(
  selectFormEditor,
  (editor) => editor.unsavedChanges
)

const selectEditorFormPublished = createSelector(
  selectFormEditor,
  (editor) => editor?.form?.status === FormStatus.open
)

const selectEditorSelectedField = createSelector(
  selectFormEditor,
  (editor) => editor.selectedField
)

const selectEditorFormFieldById = (fieldId: string) =>
  createSelector(selectEditorForm, (form) =>
    form?.fields.find((field) => field.id === fieldId)
  )

const selectEditorFormOpeningScreen = createSelector(
  selectEditorForm,
  (form) => form?.openingScreen || {}
)

const selectEditorFormAfterSubmit = createSelector(
  selectEditorForm,
  (form) => form?.afterSubmit || {}
)

const selectEditorFormStyles = createSelector(
  selectEditorForm,
  (form) => form?.styles || {}
)

const selectOpeningScreenStyles = createSelector(
  selectEditorFormStyles,
  (styles) => styles?.openingScreen || {}
)

const selectAfterSubmitStyles = createSelector(
  selectEditorFormStyles,
  (styles) => styles?.afterSubmit || {}
)

const selectEditorInputStyles = createSelector(
  selectEditorFormStyles,
  (styles) => styles?.fields?.input || {}
)

export {
  selectEditorForm,
  selectEditorIntegrations,
  selectEditorSubmitting,
  selectEditorUnsavedChanges,
  selectEditorSelectedField,
  selectEditorFormFieldById,
  selectEditorFormPublished,
  selectEditorFormOpeningScreen,
  selectEditorFormAfterSubmit,
  selectEditorFormStyles,
  selectOpeningScreenStyles,
  selectAfterSubmitStyles,
  selectEditorInputStyles,
}
