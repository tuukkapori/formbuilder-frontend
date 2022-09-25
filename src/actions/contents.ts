import { createAction } from 'redux-actions'

const reducerName = 'contents'

export const testAction = createAction(`${reducerName}/test`)
