import { methodPost, methodPostImage } from "../../method";

export const FillRegisToMember = async ({ FormData }) => {
  const url = 'account/filldata';

  const res = await methodPostImage({ endpoint: url, data: FormData });
  // const res = await methodPostImage(data, url, 'FormData');
  return res;
};

export const AddNewListAddress = async (databody) => {
  const url = 'account/addaddress';
  const body = databody;
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};

export const ChangePassword = async ({ body }) => {
  const url = 'account/editpassword';
  // const body = { old_password, new_password };
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};