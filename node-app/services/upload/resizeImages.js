import path from 'path'
import os from 'os'
import sharp from 'sharp'

const resizeImage = async (size, filepath, filename) => {
  const fileNameResized = `resized_${size}@${filename}`
  const filePathTempResized = path.join(os.tmpdir(), fileNameResized)
  const sharpParams = { width: size, height: size, fit: sharp.fit.inside, withoutEnlargement: true, background: {r: 255, g: 255, b: 255, alpha: 0}}
  await sharp(filepath).resize(sharpParams).toFormat('png').toFile(filePathTempResized)
  const filePathResized = path.join(path.dirname(filepath), fileNameResized)
  return filePathResized
}

export { resizeImage }
