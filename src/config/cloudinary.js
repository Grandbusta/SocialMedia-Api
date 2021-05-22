const cloudinary = require('cloudinary').v2
const { CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } = process.env

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

exports.uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: 'auto',
        folder: folder,
      },
      (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            id: result.public_id,
            url: result.url,
          })
        }
      },
    )
  })
}
