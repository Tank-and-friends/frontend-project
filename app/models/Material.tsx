export type MaterialInfo = {
  id: string;
  class_id: string;
  material_name: string;
  description: string;
  material_link: string;
  material_type: string;
};

export type MaterialUploadReq = {
  title: string;
  description: string;
  file: MaterialUrlInfo;
};

export type MaterialUrlInfo = {
  uri: string;
  name: string | null;
  type: string | null;
};
