export default function ({ $axios }) {
  $axios.onRequest(config => {
    config.headers.common.Authorization = `Bearer ${process.env.apiToken}`
    config.headers.common.Accept = 'application/json'
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  })
}
