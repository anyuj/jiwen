import { S3Client } from "bun";
import { serverEnv } from "@/env/server";

export const s3Client = new S3Client({
  accessKeyId: serverEnv.OSS_ACCESS_KEY_ID,
  secretAccessKey: serverEnv.OSS_ACCESS_KEY_SECRET,
  bucket: serverEnv.OSS_BUCKET,
  region: serverEnv.OSS_REGION,
  endpoint: serverEnv.OSS_ENDPOINT,
});
