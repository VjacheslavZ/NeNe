export const getImageUrl = (image: string | null) => {
  if (!image) return '';

  const storageHost = process.env.NEXT_PUBLIC_STORAGE_URL;
  if (!storageHost) return `/uploads/images/${image}`;

  return `https://${storageHost}/images/${image}`;
};
