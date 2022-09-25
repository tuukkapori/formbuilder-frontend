import { createSelector } from 'reselect'
import { StateInterface } from '../types/state'

const selectFormsDomain = (state: StateInterface) => state.forms
const selectForms = createSelector(selectFormsDomain, (forms) => forms.forms)

const selectSelectedForm = (formId: string) =>
  createSelector(selectFormsDomain, (forms) => forms.forms[formId])

const selectAnswers = createSelector(
  selectFormsDomain,
  (forms) => forms?.answers || {}
)

const selectAnwersForForm = (formId: string) =>
  createSelector(selectAnswers, (answers) => answers[formId])

const selectFormById = (formId: string) =>
  createSelector(selectForms, (forms) => forms[formId])

const selectAllFormsViewSubmitting = createSelector(
  selectFormsDomain,
  (forms) => forms.submitting
)

export {
  selectForms,
  selectSelectedForm,
  selectAnswers,
  selectAnwersForForm,
  selectFormById,
  selectAllFormsViewSubmitting,
}
