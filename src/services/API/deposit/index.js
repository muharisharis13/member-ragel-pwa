import { methodGET, methodPost, methodPostImage } from '../../method/index'

export const RequestTopUpDepo = async ({ body }) => {
  const url = 'account/deposit/reqdepo';
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};

export const TopUpDepoHistori = async () => {
  const url = 'account/deposit/depohistory';
  const data = await methodGET({ endpoint: url });
  return data;
};

export const UploadBuktiTopUp = async ({ body }) => {
  const url = 'account/deposit/uploadproof';

  const res = await methodPostImage({ endpoint: url, data: body });
  return res;
};