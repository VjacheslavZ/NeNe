export const getImageUrl = (image: string | null) => {
  if (!image) return '';
  return `/uploads/images/${image}`;
};
