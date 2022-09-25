import { createAction } from 'redux-actions'

const createAsyncMediaAction = (action: string) => ({
  action: createAction(`MEDIA/${action}`) as any,
  success: createAction(`MEDIA/${action}_SUCCESS`) as any,
  fail: createAction(`MEDIA/${action}_FAIL`) as any,
})

/* const createMediaAction = (type: string) => createAction(`MEDIA/${type}`) as any */

const {
  action: getMedia,
  success: getMediaSuccess,
  fail: getMediaFail,
} = createAsyncMediaAction('GET_MEDIA')

const {
  action: uploadMedia,
  success: uploadMediaSuccess,
  fail: uploadMediaFail,
} = createAsyncMediaAction('UPLOAD_MEDIA')

export {
  getMedia,
  getMediaSuccess,
  getMediaFail,
  uploadMedia,
  uploadMediaSuccess,
  uploadMediaFail,
}
