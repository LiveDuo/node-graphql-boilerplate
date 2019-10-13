// Contents of Upload scalar: 
// https://github.com/jaydenseric/graphql-upload#class-graphqlupload
// file.stream is a node stream that contains the contents of the uploaded file node stream api: 
// https://nodejs.org/api/stream.html

import { uploadToGoogleCloudStorage } from '../../services/upload/googleCloudStorage'

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

const doTestUpload = async (_, params) => {

  let fileDecoded = await params.file

  if (!fileDecoded.mimetype.startsWith('image/')) {
    throw new Error('This is not an image')
  }

  let filepath = await storeToTempDir(fileDecoded)

  let mediaUrl = await uploadToGoogleCloudStorage(filepath, 'test_single')

  await fs.unlinkSync(filepath)

  return {url: mediaUrl}
}

export { doTestUpload }