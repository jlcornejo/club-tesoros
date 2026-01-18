import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'jlcr-club-tesoros';

export interface UploadImageParams {
  file: Buffer;
  fileName: string;
  contentType: string;
  userId: string;
  feriaId: string;
}

export async function uploadImageToS3({
  file,
  fileName,
  contentType,
  userId,
  feriaId,
}: UploadImageParams): Promise<string> {
  // Generar nombre único para el archivo
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `images/${userId}/${feriaId}/${timestamp}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
    // Hacer las imágenes públicas para lectura
    ACL: 'public-read',
  });

  await s3Client.send(command);

  // Retornar la URL pública de la imagen
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-1'}.amazonaws.com/${key}`;
}

export async function deleteImageFromS3(imageUrl: string): Promise<void> {
  try {
    // Extraer la key de la URL
    const url = new URL(imageUrl);
    const key = url.pathname.substring(1); // Remover el "/" inicial

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error al eliminar imagen de S3:', error);
    throw error;
  }
}

export async function deleteMultipleImagesFromS3(imageUrls: string[]): Promise<void> {
  const deletePromises = imageUrls.map(url => deleteImageFromS3(url));
  await Promise.all(deletePromises);
}
