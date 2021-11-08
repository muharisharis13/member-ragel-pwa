import { methodGET, methodPost } from "../../method"



export const AddtoCart = async ({ body }) => {
  const url = 'product/addtobucket';
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};

export const GetAllCart = async () => {
  const url = 'product/getbucketlist';
  const data = await methodGET({ endpoint: url });
  return data;
};
export const RemoveCart = async ({ body }) => {
  const url = 'product/rmvfrombucket';
  const data = await methodPost({ endpoint: url, data: body });
  return data;
};



export const GetAllProduct = () => {
  const data = methodGET({ endpoint: 'product/all' })
  return data
}

export const DetailProduct1 = async (id_product) => {
  const url = `product/detail/${id_product}`;
  const data = await methodGET({ endpoint: url });
  return data;
};

export const GetAllFeedbacks = async ({ product_id, page }) => {
  const url = `product/feedback/${product_id}`;
  const data = await methodGET({ endpoint: url });
  return data;
};


// untuk wishlist

export const WhislistProduk = async ({ product_id }) => {
  const url = `product/wishlist/add`
  const body = { product_id }
  const data = methodPost({ endpoint: url, data: body })

  return data
}

export const RemoveWhislist = async ({ product_id }) => {
  const url = `product/wishlist/rmv`
  const body = { product_id }
  const data = methodPost({ endpoint: url, data: body })

  return data
}