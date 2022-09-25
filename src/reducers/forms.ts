import { handleActions } from 'redux-actions'
import type { Reducer } from '@reduxjs/toolkit'
import {
  getFormsSuccess,
  getFormSuccess,
  createFormSuccess,
  deleteFormSuccess,
  setSubmitting,
  getAnswersForFormSuccess,
} from '../actions/forms'
import { FormsState } from '../types/state'
import { newAnswerFromSubsub } from '../actions/answers'

const initialState: any = {
  forms: {} as any,
  answers: undefined as any,
  submitting: false,
}

const formsReducer = handleActions<FormsState, any>(
  {
    [getFormsSuccess]: (state, { payload: forms }) => ({
      ...state,
      forms,
    }),
    [getFormSuccess]: (state, { payload: { form, formId } }) => ({
      ...state,
      forms: {
        ...state.forms,
        [formId]: form,
      },
    }),
    [createFormSuccess]: (state, { payload: { form, formId } }) => ({
      ...state,
      forms: {
        ...state.forms,
        [formId]: form,
      },
    }),
    [deleteFormSuccess]: (state, { payload: formId }) => {
      const forms = { ...state.forms }
      delete forms[formId]
      return {
        ...state,
        forms,
      }
    },
    [setSubmitting]: (state, { payload: submitting }) => ({
      ...state,
      submitting,
    }),
    [getAnswersForFormSuccess]: (
      state,
      {
        payload: {
          answers: { answers },
          formId,
        },
      }
    ) => ({
      ...state,
      answers: {
        ...state.answers,
        [formId]: answers,
      },
    }),
    [newAnswerFromSubsub]: (state, { payload: { formId, submission } }) => ({
      ...state,
      answers: {
        ...state.answers,
        [formId]: (state.answers[formId] || []).concat(submission),
      },
    }),
  },
  initialState
) as Reducer

export default formsReducer
