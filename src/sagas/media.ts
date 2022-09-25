import { put, all, takeEvery, call } from 'redux-saga/effects'
import {
  getMedia,
  getMediaFail,
  getMediaSuccess,
  uploadMedia,
  uploadMediaFail,
  uploadMediaSuccess,
} from '../actions/media'
import { uploadMediaFile, getUserMedia } from '../services/media'

export function* handleGetMedia(): Generator<any, any, any> {
  try {
    const media = yield call(getUserMedia)

    yield put(getMediaSuccess(media))
  } catch (error) {
    yield put(getMediaFail())
  }
}

export function* handleUploadMedia({
  payload: file,
}: any): Generator<any, any, any> {
  try {
    yield call(uploadMediaFile, file)

    yield put(uploadMediaSuccess())
    yield put(getMedia())
  } catch (error) {
    yield put(uploadMediaFail())
  }
}

export function* watchMediaActions() {
  yield all([
    takeEvery(getMedia, handleGetMedia),
    takeEvery(uploadMedia, handleUploadMedia),
  ])
}
