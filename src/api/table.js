import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/reservation/page',
    method: 'post',
    params
  })
}
