// Testing Authentication API Routes

import {resetDb} from '../_auxiliary/db-utils'
import * as generate from '../_auxiliary/generate'
import startServer from '../_auxiliary/start'

let server: any

beforeAll(async () => {
  server = await startServer({port: 8000})
})

afterAll(() => server.close())

beforeEach(() => resetDb())

test('auth flow', async () => {
  // 🐨 достань константы username и password из generate.loginForm()
  //
  // register
  // 🐨 используй await axios.post(url, body) чтобы отправить username и password на сервер по адресу регистрации
  // 💰 http://localhost:8000/api/auth/register
  //
  // 🐨 проверь, правильные ли ты получил результаты (они будут в res.data.user)
  // 💰 it'll have an id and a token that will be random every time.
  // 💰 в каждом ответе будут случайные id и token
  //    Достаточно просто проверить, что `result.data.user.username` правильный,
  //    а для доп. задания 💯 можно попробовать `expect.any(String)` для остальных полей
  // 📜 https://jestjs.io/docs/en/expect#expectanyconstructor
  // 📜 https://jestjs.io/docs/en/expect#toequalvalue
  //
  // login
  // 🐨 используй await axios.post(url, body) чтобы отправить username и password на сервер по адресу логина
  // 💰 http://localhost:8000/api/auth/login
  //
  // 🐨 проверь, правильные ли ты получил результаты (они будут в res.data.user)
  // 💰 данные вернутся такие же, которые ты отправил на регистрации
  //
  // authenticated request
  // 🐨 используй await axios.get(url, config) xnj, чтобы получить информацию о пользователе
  // 💰 http://localhost:8000/api/auth/me
  // 💰 Запрос должен содержать Authorization header котрый можно добавить в config:
  //    {headers: {Authorization: `Bearer ${token}`}}
  //    Токен ты получил в обоих прошлых запросах
  //
  // 🐨 проверь, правильные ли ты получил результаты (они будут в res.data.user)
  // 💰 (и снова, данные вернутся такие же, которые ты отправил на регистрации)
})
