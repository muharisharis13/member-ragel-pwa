import { methodGET, methodPost } from "../../method";

export const RateProduct = async ({ body }) => {
  const url = 'order/addreview';
  // const body = { order_detail_id, product_id, rating, comment }
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};

//History Shopping
export const GetHistoryOrder = async () => {
  const url = 'order/history';
  const data = await methodGET({ endpoint: url });
  return data;
};
export const GetHistoryOrderDetail = async (order_id) => {
  const url = `order/detailhistory/${order_id}`;
  const data = await methodGET({ endpoint: url });
  return data;
};