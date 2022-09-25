import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from '@firebase/storage'
import { getFirebaseUserId } from './firebase/auth'
import { getFirebaseApp } from './firebase/app'

const app = getFirebaseApp()

const storage = getStorage(app)

const uploadMediaFile = async (file: any) => {
  const userId = await getFirebaseUserId()

  const storageRef = ref(storage, `users/${userId}/${file.name}`)
  const res = await uploadBytes(storageRef, file)
  console.log('res from file upload ', res)
  const url = await getDownloadURL(storageRef)
  console.log('url: ', url)
}

const getUserMedia = async () => {
  const userId = await getFirebaseUserId()
  const listRef = ref(storage, `users/${userId}`)
  console.log('listRef ', listRef)

  const list = await listAll(listRef)

  console.log('list ', list)

  const urls = await Promise.all(
    list.items.map(async (item) => {
      const url = await getDownloadURL(item)
      const metaData = await getMetadata(item)
      return { url, name: metaData.name }
    })
  )

  console.log('media urls', urls)
  return urls
}

export { uploadMediaFile, getUserMedia }
