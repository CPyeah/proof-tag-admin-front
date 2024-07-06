import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/reservation/page',
    method: 'post',
    data: query
  })
}

// fetchFactoryIdOptions
export function fetchFactoryIdOptions() {
  return request({
    url: '/reservation/factoryIdOptions',
    method: 'get'
  })
}

// getImageBase64
export function getImageBase64(fileId) {
  return request({
    url: '/reservation/getImageBase64/' + fileId,
    method: 'get'
  })
}

// auditPass
export function auditPass(id, reason) {
  return request({
    url: '/reservation/audit/pass/' + id,
    method: 'post'
  })
}

// auditFallback
export function auditFallback(id, reason) {
  return request({
    url: '/reservation/audit/fallback/' + id,
    method: 'post',
    data: {"reason": reason}
  })
}

// inFactory
export function inFactory(id) {
  return request({
    url: '/reservation/inFactory/' + id,
    method: 'post'
  })
}

// outFactory
export function outFactory(id) {
  return request({
    url: '/reservation/outFactory/' + id,
    method: 'post'
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}


export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}