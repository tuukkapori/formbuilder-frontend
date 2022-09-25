import { createAction } from 'redux-actions'

const createAnswersAction = (type: string) =>
  createAction(`ANSWERS/${type}`) as any

const createAsyncAnswersAction = (action: string) => ({
  action: createAction(`ANSWERS/${action}`) as any,
  success: createAction(`ANSWERS/${action}_SUCCESS`) as any,
  fail: createAction(`ANSWERS/${action}_FAIL`) as any,
})

const {
  action: getAnswersForForm,
  success: getAnswersForFormSuccess,
  fail: getAnswersForFormFail,
} = createAsyncAnswersAction('GET')

const newAnswerFromSubsub = createAnswersAction('NEW_ANSWER_FROM_PUBSUB')

export {
  newAnswerFromSubsub,
  getAnswersForForm,
  getAnswersForFormSuccess,
  getAnswersForFormFail,
}
