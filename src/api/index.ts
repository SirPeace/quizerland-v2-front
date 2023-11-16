import axios from 'axios'

const $api = axios.create({
  baseURL: 'http://localhost:9000',
  responseType: 'json',
  // cookie, автоматически прикрепляем к каждому запросу
  withCredentials: true,
})

export default $api
