import { methodGET } from '../../../services/method/index'


export const getDataEvent = async () => {
  const url = 'event/all'
  const data = await methodGET({ endpoint: url })

  return data
}