import type { Reducer } from '@reduxjs/toolkit'

interface MediaFile {
  name: string
  url: string
}

const initialState = {
  mediaFiles: [] as MediaFile[],
}

const mediaReducer: Reducer = (state = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case 'MEDIA/GET_MEDIA_SUCCESS':
      return {
        ...state,
        mediaFiles: payload,
      }

    default:
      return {
        ...state,
      }
  }
}

export default mediaReducer
