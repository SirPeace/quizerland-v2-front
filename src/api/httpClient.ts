import axios from 'axios'

const httpClient = axios.create({
  responseType: 'json',
  withCredentials: true, // автоматически прикрепляем cookie к каждому запросу
})

export default httpClient
