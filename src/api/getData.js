import { reqHandler } from '@api';

export const getdata1 = params =>
  reqHandler({
    type: 'get',
    url: '/get/data',
    params
  });
