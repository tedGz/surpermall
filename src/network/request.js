import axios from 'axios'

export function request(option) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/hy66',
      timeout: 5000
    })

    instance.interceptors.request.use(config => {
      return config
    }, err => {
      return err
    })

    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      return err
    })

    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}