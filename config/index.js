import "dotenv/config";

export const Config = {
  port: process.env.PORT,
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  cookiesExpire: process.env.JWT_COOKIE_EXPIRES,
  bucketName: process.env.BUCKET_NAME,
  endpoint: process.env.ENDPOINT,
  awsAccessKeyId: process.env.aws_access_key_id,
  awsSecretAccessKey: process.env.aws_secret_access_key,
  cdn: process.env.CDN,
  dbPort: process.env.DB_PORT,
};
