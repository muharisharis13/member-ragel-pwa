import { methodGET, methodPost } from "../../method"



export const LoginUser = async ({ databody }) => {
  const url = `login`
  const body = databody
  const data = methodPost({ endpoint: url, data: body })

  return data
}

export const signUp = async ({ body }) => {
  const url = 'signup';
  // const body = { full_name, email, phone_number };
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};

export const Logout = async (accessToken) => {
  const url = 'logout';
  const data = await methodGET({ endpoint: url });
  return data;
};
