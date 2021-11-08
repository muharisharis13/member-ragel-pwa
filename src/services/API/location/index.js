import { methodGET, methodPost } from "../../method";

export const getProvince = async () => {
  const url = 'loc/prov';
  const data = await methodGET({ endpoint: url });
  return data;
};

export const getCity = async (prov_id) => {
  const url = `loc/kota/${prov_id}`;
  const data = await methodGET({ endpoint: url });
  return data;
};

// nambah alamat baru => untuk user baru

export const addNewAddress = async (body) => {
  const url = "account/addaddress  "
  const data = await methodPost({ endpoint: url, data: body })

  return data
}