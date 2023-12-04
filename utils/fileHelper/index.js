const cloudinary = require('cloudinary').v2;

const upload = async (fileBuffer, oldPublicId) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const options = {
    resource_type: 'image',
    public_id: `wehealth/images/${Date.now()}`,
  };

  // Delete the old image if a public ID is provided
  if (oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId);
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) reject(error);
        resolve(result);
      })
      .end(fileBuffer);
  });
};

module.exports = {
  upload,
};
