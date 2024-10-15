import { Request, Response } from 'express';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { handleAsyncErrors } from '@/middleware/handle-error';

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION } from '@/config';

import type { UploadedFile } from 'express-fileupload';

/**
 * Bucket Controller contains methods for file upload operations
 * using AWS S3
 * @class
 */
@handleAsyncErrors
export class BucketController {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: S3_REGION, // Replace with your AWS region
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID, // Replace with your AWS access key ID
        secretAccessKey: AWS_SECRET_ACCESS_KEY, // Replace with your AWS secret access key
      },
    });
  }

  async uploadToS3(file: UploadedFile) {
    console.log('Start upload file to S3');
    // Check file size
    if (file.size > 4 * 1024 * 1024) {
      // 4MB limit
      throw new Error('File size exceeds 4MB limit.');
    }

    console.log('File size verified');

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/avif', 'image/webp', 'image/gif']; // Allowed image MIME types
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Only image files (JPEG, PNG, WEBP, AVIF) are allowed.');
    }

    console.log('File type verified');

    // Upload the file to S3 using Upload function
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: S3_BUCKET,
        Key: file.name.replace(/[^a-zA-Z0-9-.\s]/g, '').replace(/\s+/g, '-'),
        Body: file.data,
        ContentType: file.mimetype,
        ContentDisposition: 'inline', // Set Content-Disposition to 'inline' to display the file in the browser
      },
    });

    console.log('Upload object created');

    const result = await upload.done();
    console.log('Prepare result', result);

    const response = {
      location: result.Location,
      name: result.Key,
    };

    console.log('Returning response:', response);

    return response;
  }

  /**
   * Upload a single file to S3
   * @returns status 200 if OK with the uploaded file details
   * @returns status 400 if no file uploaded
   * @returns status 500 if server error
   */
  static async uploadOne(req: Request, res: Response) {
    console.log('Upload one file to S3');
    const file = req.files?.file as UploadedFile; // Assuming you're using multer or similar middleware for handling file uploads

    if (!file) {
      console.log('No file uploaded > 400');
      return res.status(400).send('No file uploaded.');
    }

    console.log('File ready to upload >>>');

    try {
      const bucketController = new BucketController();
      // Upload single file to S3
      const uploadedFile = await bucketController.uploadToS3(file);

      console.log('Single file was uploaded:', uploadedFile);

      res.status(200).send(uploadedFile); // OK
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
    console.log('Upload multiple files to S3');
    const files = req.files?.files as UploadedFile[]; // Assuming you're using multer or similar middleware for handling file uploads

    if (!files || !files.length) {
      return res.status(400).send('No files uploaded.');
    }

    try {
      const bucketController = new BucketController();
      // Upload all files to S3 in parallel
      const results = await Promise.all(files.map((file) => bucketController.uploadToS3(file)));
      res.status(200).send(results); // OK
    } catch (err) {
      console.error('Error uploading files:', err.message);
      res.status(500).send({ status: 500, message: 'Error uploading files to S3.', reason: err.message });
    }
  }
}
