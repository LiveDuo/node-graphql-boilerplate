import { Storage as GoogleCloudStorage } from '@google-cloud/storage'

import path from 'path'

const googleCloudStorage = new GoogleCloudStorage({
  projectId: process.env.GOOGLE_AUTH_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_AUTH_PRIVATE_KEY
  }
})
const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME
const bucket = googleCloudStorage.bucket(bucketName)

const getPublicUrl = (filename) => {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename
}

const uploadToGoogleCloudStorageWithStreams = (filepath, foldername) => {
  
  if (!filepath) {
    throw new Error('File null')
  }

  // Can optionally add a path to the gcsname below 
  // by concatenating it before the filename
  const filename = path.basename(filepath)
  
  const file = bucket.file(filepath)

  const options = {
    gzip: true,
    destination: foldername + '/' + filename,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    }
  }

  const stream = file.createWriteStream(options)

  stream.on('error', (err) => {
    file.cloudStorageError = err
    throw new Error('Stream error')
  })
  
  stream.on('finish', () => {
    file.cloudStorageObject = filename
    file.cloudStoragePublicUrl = getPublicUrl(filename)
    return
  })

  stream.end(file.buffer)
}

const uploadToGoogleCloudStorage = async (filepath, foldername) => {

  const filename = path.basename(filepath)

  const options = {
    gzip: true,
    destination: foldername + '/' + filename,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    }
  }
  const result = await bucket.upload(filepath, options)

  const signedUrlConfig = { action: 'read', expires: '01-01-3000', }
  const signedUrl = await result[0].getSignedUrl(signedUrlConfig)

  return signedUrl[0]
}
export { uploadToGoogleCloudStorage, uploadToGoogleCloudStorageWithStreams }