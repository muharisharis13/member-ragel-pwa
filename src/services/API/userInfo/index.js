import { methodGET } from "../../method"


export const Get_UserInfo = async () => {
  const url = 'info'
  const data = await methodGET({ endpoint: url })

  return data
}