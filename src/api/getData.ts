import { reqHandler } from '@api/index';

export const getdata1 = (params: object) =>
  reqHandler({
    type: 'get',
    url: '/get/data',
    params
  });
