import { createSelector } from 'reselect'

const selectMedia = (state: any) => state.media

const selectMediaFiles = createSelector(
  selectMedia,
  (media) => media.mediaFiles
)

export { selectMediaFiles }
