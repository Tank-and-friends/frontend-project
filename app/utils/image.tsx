//chuyển đổi link ảnh avatar từ response
export const getDirectImageLink = (url: string): string => {
  const fileIdMatch = url.match(/\/d\/(.*?)\//);
  return fileIdMatch ? `https://drive.google.com/uc?id=${fileIdMatch[1]}` : url;
};
