import { Request, Response } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import type { UploadedFile } from 'express-fileupload';

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION } from '@/config';

export class BucketController {
  static async uploadToS3(file: UploadedFile) {
    // Check file size
    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      throw new Error('File size exceeds 2MB limit.');
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']; // Allowed image MIME types
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Only image files (JPEG, PNG, WEBP) are allowed.');
    }

    // Create an S3 client
    const s3Client = new S3Client({
      region: S3_REGION, // Replace with your AWS region
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID, // Replace with your AWS access key ID
        secretAccessKey: AWS_SECRET_ACCESS_KEY, // Replace with your AWS secret access key
      },
    });

    // Upload the file to S3 using Upload function
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: S3_BUCKET,
        Key: file.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_'),
        Body: file.data,
        ContentType: file.mimetype,
        ContentDisposition: 'inline', // Set Content-Disposition to 'inline' to display the file in the browser
      },
    });

    const result = await upload.done();
    return {
      location: result.Location,
      name: result.Key,
    };
  }

  /**
   * Upload a single file to S3
   * @returns status 200 if OK with the uploaded file details
   * @returns status 400 if no file uploaded
   * @returns status 500 if server error
   */
  static async uploadOne(req: Request, res: Response) {
    const file = req.files?.file as UploadedFile; // Assuming you're using multer or similar middleware for handling file uploads

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      // Upload single file to S3
      const result = await BucketController.uploadToS3(file);
      res.status(200).send(result); // OK
    } catch (err) {
      console.error('Error uploading file:', err.message);
      res.status(500).send({ status: 500, message: 'Error uploading file to S3.', reason: err.message });
    }
  }

  /**
   * Upload multiple files to S3
   * @returns status 200 if OK with an array of uploaded files details
   * @returns status 400 if no files uploaded
   * @returns status 500 if server error
   */
  static async uploadBulk(req: Request, res: Response) {
    const files = req.files?.files as UploadedFile[]; // Assuming you're using multer or similar middleware for handling file uploads

    if (!files || !files.length) {
      return res.status(400).send('No files uploaded.');
    }

    try {
      // Upload all files to S3 in parallel
      const results = await Promise.all(files.map((file) => BucketController.uploadToS3(file)));
      res.status(200).send(results); // OK
    } catch (err) {
      console.error('Error uploading files:', err.message);
      res.status(500).send('Error uploading files to S3.');
    }
  }
}
