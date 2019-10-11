// const { storage } = require('../helpers/firebase')

import path from 'path'
import os from 'os'
import fs from 'fs'
import sharp from 'sharp'

const sizes = [128, 256, 512, 1024]

let uploadPromise = async (size, customMetadata) => {
  const fileNameResized = `resized_${size}@${fileName}`
  const filePathTempResized = path.join(os.tmpdir(), fileNameResized)
  const sharpParams = { width: size, height: size, fit: sharp.fit.inside, withoutEnlargement: true, background: {r: 255, g: 255, b: 255, alpha: 0}}
  await sharp(filePathTemp).resize(sharpParams).toFormat('png').toFile(filePathTempResized)
  const filePathResized = path.join(path.dirname(filePath), fileNameResized)
  const fileResized = await bucket.upload(filePathTempResized, { destination: filePathResized, metadata: customMetadata })
  await fs.unlinkSync(filePathTempResized)

  const signedUrlConfig = { action: 'read', expires: '01-01-3000', }
  const urls = await fileResized[0].getSignedUrl(signedUrlConfig)
  return {["imageUrl"+size]: urls[0]}
}

let resizeImage = async (data) => {
  const filePath = data.filePath
  const bucket = storage.bucket()
  const file = bucket.file(filePath)

  const metadata = await file.getMetadata()
  const customMetadata = { metadata: {} }
  
  // Exit if this is triggered on a file that is not an image.
  if (!metadata[0].contentType.startsWith('image/')) {
    return console.log('This is not an image.')
  }

  // Download file from bucket.
  const fileName = path.basename(filePath)
  const filePathTemp = path.join(os.tmpdir(), fileName)
  await file.download({destination: filePathTemp})
  console.log('Image downloaded locally to temp folder from storage')

  // // Resize using Sharp
  const uploadPromises = sizes.map((size) => uploadPromise(size, customMetadata));
  const imageUrls = await Promise.all(uploadPromises)

  // Once uploaded delete from temp
  await fs.unlinkSync(filePathTemp);

  return imageUrls
}
export { resizeImage }
