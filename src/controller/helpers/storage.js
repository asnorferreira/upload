import aws from "../../config/aws.js";

export const uploadFile = async (path, buffer, mimetype) => {
  const file = await aws
    .upload({
      Bucket: process.env.BACKBLAZER_BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return {
    url: file.Location,
    path: file.Key,
  };
};

export const listFile = async () => {
    const fileList = await aws
      .listObjects({
        Bucket: process.env.BACKBLAZE_BUCKET,
      })
      .promise();

   const files = fileList.Contents.map((file) => {
    return {
        url: `https://${process.env.BACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${file.Key}`,
        path: file.Key,
      }
   })

   return files
}

export const deleteFile = async (path) => {
  await aws
    .deleteObject({
      Bucket: process.env.BACKBLAZER_BUCKET,
      Key: path,
    })
    .promise();
};
