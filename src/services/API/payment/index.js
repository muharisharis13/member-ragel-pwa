import { methodGET } from "../../method";


export const GetPaymentGetway = async () => {
  const url = 'paygate/all';
  const data = await methodGET({ endpoint: url })

  return data
}