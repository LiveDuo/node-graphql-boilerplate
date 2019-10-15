import { uploadToGoogleCloudStorage } from './googleCloudStorage'
import { resizeImage } from './resizeImages'

import fs from 'fs'
import os from 'os'

const storeToTempDir = (fileDecoded) => {
  const readStream = fileDecoded.createReadStream()
  const uploadDir = os.tmpdir()
  const path = `${uploadDir}/${fileDecoded.filename}`
  return new Promise((resolve, reject) =>
    readStream
      .on('error', error => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve(path))
  )
}

const uploadImageToFolderpath = async (file, folderpath) => {

  let fileDecoded = await file

  if (!fileDecoded.mimetype.startsWith('image/')) {
    throw new Error('This is not an image')
  }

  let filepath = await storeToTempDir(fileDecoded)

  let mediaUrl = await uploadToGoogleCloudStorage(filepath, folderpath)

  await fs.unlinkSync(filepath)

  return mediaUrl
}

export { uploadImageToFolderpath }

const resizeSizes = [128, 256, 512, 1024]

const resizeUploadAndUnlink = async (size, filepath, filename) => {
  let filePathResized = await resizeImage(size, filepath, filename)
  let mediaUrl = await uploadToGoogleCloudStorage(filePathResized, 'test_resized')
  await fs.unlinkSync(filePathResized)
  return mediaUrl
}

const uploadImageResizedToFolderpath = async (file, folderpath) => {

  let fileDecoded = await file

  let filepath = await storeToTempDir(fileDecoded)

  let resizedPromises = []
  for (let size of resizeSizes) {
    let promise = resizeUploadAndUnlink(size, filepath, fileDecoded.filename)
    resizedPromises.push(promise)
  }
  const imageUrls = await Promise.all(resizedPromises)

  await fs.unlinkSync(filepath)

  return imageUrls
}

export { uploadImageResizedToFolderpath }