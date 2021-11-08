import { methodGET, methodPost } from "../../method"


export const CheckOutOrder = async ({ databody }) => {
  const url = 'product/checkout';
  const body = databody;
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};

export const GetShippingList = async () => {
  const url = 'shipping/shiplist'
  const data = await methodGET({ endpoint: url })

  return data
}