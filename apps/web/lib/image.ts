export const getImageUrl = (image: string | null) => {
  if (!image) return '';

  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || `/uploads/images`;
  return `${storageUrl}/${image}`;
};
