import { Storage } from '@google-cloud/storage'

const gcs = new Storage({
  projectId: process.env.GOOGLE_AUTH_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_AUTH_PRIVATE_KEY
  }
})
const bucketName = process.env.GOOGLE_STORAGE_BUCKET_NAME
const bucket = gcs.bucket(bucketName)

const getPublicUrl = (filename) => {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename
}

let imgUpload = {}

imgUpload.uploadToGcs = (req, res, next) => {

  if (!req.file) {
    return next()
  }

  // Can optionally add a path to the gcsname below 
  // by concatenating it before the filename
  const gcsname = req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err);
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
    next()
  })

  stream.end(req.file.buffer)
}

export { imgUpload }