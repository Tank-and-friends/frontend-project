//chuyển đổi link ảnh avatar từ response
export const getDirectImageLink = (url: string): string => {
  const fileIdMatch = url.match(/\/d\/(.*?)\//);
  return fileIdMatch ? `https://drive.google.com/uc?id=${fileIdMatch[1]}` : url;
};

export const getDirectMaterialLink = (url: string): string => {
  const fileIdMatch = url.match(/\/d\/(.*?)\//);
  return 'https://cafefcdn.com/203337114487263232/2023/11/16/shopee-11-11-header-2-1000x600-17001040909991332484536-1700105205042-1700105205215750631411.jpg';
};
