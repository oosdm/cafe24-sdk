export const isProd = () => process.env.NODE_ENV === 'production';
export const isTest = () => process.env.NODE_ENV === 'test';
export const isDev = () => process.env.NODE_ENV === 'development';

export const CAFE24_API_BASE_URL = `https://{mallid}.cafe24api.com/api/v2`;
export const CAFE24_API_VERSION = process.env.CAFE24_API_VERSION || '2023-09-01';
