## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## Критерії прийому дз # 2-6

- Створено репозиторій з домашнім завданням &mdash; REST API додаток
- При створенні репозиторія використаний
  [бойлерплейт](https://github.com/goitacademy/nodejs-homework-template)
- Пулл-реквест (PR) з відповідним дз відправлений менторові на перевірку
  (посилання на PR)
- Код відповідає технічному завданню проекта
- При виконанні коду не виникає необроблених помилок
- Назва змінних, властивостей і методів починається з малої літери і записуються
  в нотації CamelCase. Використовуються англійські іменники
- Назва функції або методу містить дієслово
- У коді немає закоментуваних ділянок коду
- Проект коректно працює з актуальною LTS-версією Node

---

# Домашнє завдання 2

Подивися пояснююче відео як це зробити та здавати ДЗ правильно:
[![Title](./assets/js.png)](https://www.youtube.com/watch?v=wabSW_sz_cM " пояснення")

Написати REST API для роботи з колекцією контактів. Для роботи з REST API
використовуй [Postman] (https://www.getpostman.com/).

Прочитай уважно readme в клонованому темплейті, там описаний механізм здачі
домашніх завдань. Та починай виконувати ДЗ

## Крок 1

Створи гілку `hw02-express` з гілки master.

Встанови модулі командою

```bash
npm i
```

Такі модулі є в проекті:

- [express](https://www.npmjs.com/package/express)
- [morgan](https://www.npmjs.com/package/morgan)
- [cors](https://www.npmjs.com/package/cors)

## Крок 2

У `app.js` – веб сервер на `express` і прошарки `morgan` та `cors`. Почни
налаштовувати раутінг для роботи з колекцією контактів.

REST API повинен підтримувати такі раути.

### @ GET /api/contacts

- нічого не отримує
- викликає функцію `listContacts` для роботи з json-файлом `contacts.json`
- повертає масив всіх контактів в json-форматі зі статусом `200`

### @ GET /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- викликає функцію `getById` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає об'єкт контакту в json-форматі зі статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і
  статусом `404`

### @ POST /api/contacts

- Отримує `body` в форматі `{name, email, phone}` (усі поля обов'язкові)
- Якщо в `body` немає якихось обов'язкових полів, повертає json з ключем
  `{"message": "missing required name field"}` і статусом `400`
- Якщо з `body` все добре, додає унікальний ідентифікатор в об'єкт контакту
- Викликає функцію `addContact(body)` для збереження контакту в файлі
  `contacts.json`
- За результатом роботи функції повертає об'єкт з доданим `id`
  `{id, name, email, phone}` і статусом `201`

### @ DELETE /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- Викликає функцію `removeContact` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає json формату `{"message": "contact deleted"}` і
  статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і
  статусом `404`

### @ PUT /api/contacts/:id

- Отримує параметр `id`
- Отримує `body` в json-форматі з оновленням будь-яких полів
  `name, email и phone`
- Якщо `body` немає, повертає json з ключем `{"message": "missing fields"}` і
  статусом `400`
- Якщо з `body` все добре, викликає функцію `updateContact(contactId, body)`.
  (Напиши її) для поновлення контакту в файлі `contacts.json`
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом
  `200`. В іншому випадку, повертає json з ключем `"message": "Not found"` і
  статусом `404`

## Крок 3

Для маршрутів, що приймають дані (`POST` та ` PUT`), продумайте перевірку
(валідацію) отриманих даних. Для валідації прийнятих даних використовуйте пакет
[joi](https://github.com/sideway/joi)

# Домашнє завдання 4

Створи гілку `04-auth` з гілки `master`.

Продовж створення REST API для роботи з колекцією контактів. Додай логіку
аутентифікації/авторизації користувача через [JWT](https://jwt.io/).

## Крок 1

У коді створи схему і модель користувача для колекції `users`.

```js
{
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
}
```

Змініть схему контактів, щоб кожен користувач бачив тільки свої контакти. Для
цього в схемі контактів додайте властивість

```js
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
```

Примітка: `'user'` - назва колекції, у якій зберігаються користувачі

## Крок 2

### Реєстрація

Створити ендпоінт [`/users/register`](#registration-request)

Зробити валідацію всіх обов'язкових полів (email і password). При помилці
валідації повернути [Помилку валідації](#registration-validation-error).

У разі успішної валідації в моделі `User` створити користувача за даними, які
пройшли валідацію. Для засолювання паролів використовуй
[bcrypt](https://www.npmjs.com/package/bcrypt) або
[bcryptjs](https://www.npmjs.com/package/bcryptjs)

- Якщо пошта вже використовується кимось іншим, повернути
  [Помилку Conflict](#registration-conflict-error).
- В іншому випадку повернути
  [Успішна відповідь](#registration-success-response).

#### Registration request

```shell
POST /users/register
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Registration validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
```

#### Registration conflict error

```shell
Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
```

#### Registration success response

```shell
Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

### Логін

Створити ендпоінт [`/users/login`](#login-request)

В моделі `User` знайти користувача за `email`.

Зробити валідацію всіх обов'язкових полів (email і password). При помилці
валідації повернути [Помилку валідації](#validation-error-login).

- В іншому випадку, порівняти пароль для знайденого користувача, якщо паролі
  збігаються створити токен, зберегти в поточному юзера і повернути
  [Успішна відповідь](#login-success-response).
- Якщо пароль або імейл невірний, повернути
  [Помилку Unauthorized](#login-auth-error).

#### Login request

```shell
GET /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

#### Login validation error

```shell
Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
```

#### Login success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

#### Login auth error

```shell
Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}
```

## Крок 3

### Перевірка токена

Створи мідлвар для перевірки токена і додай його до всіх раутів, які повинні
бути захищені.

- Мідлвар бере токен з заголовків `Authorization`, перевіряє токен на
  валідність.
- У випадку помилки повернути
  [Помилку Unauthorized](#middleware-unauthorized-error).
- Якщо валідація пройшла успішно, отримати з токена `id` користувача. Знайти
  користувача в базі даних з цим `id`.
- Якщо користувач існує і токен збігається з тим, що знаходиться в базі,
  записати його дані в `req.user` і викликати `next()`.
- Якщо користувача з таким `id` НЕ існує або токени не збігаються, повернути
  [Помилку Unauthorized](#middleware-unauthorized-error)

#### Middleware unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

## Крок 4

### Логаут

Створити ендпоінт [`/users/logout`](#logout-request)

Додай в маршрут мідлвар перевірки токена.

- У моделі `User` знайти користувача за `_id`.
- Якщо користувача не існує повернути
  [Помилку Unauthorized](#logout-unauthorized-error).
- В іншому випадку, видалити токен у поточного юзера і повернути
  [Успішна відповідь](#logout-success-response).

#### Logout request

```shell
POST /users/logout
Authorization: "Bearer {{token}}"
```

#### Logout unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Logout success response

```shell
Status: 204 No Content
```

## Крок 5

### Поточний користувач - отримати дані юзера по токену

Створити ендпоінт [`/users/current`](#current-user-request)

Додай в раут мідлвар перевірки токена.

- Якщо користувача не існує повернути
  [Помилку Unauthorized](#current-user-unauthorized-error)
- В іншому випадку повернути [Успішну відповідь](#current-user-success-response)

#### Current user request

```shell
GET /users/current
Authorization: "Bearer {{token}}"
```

#### Current user unauthorized error

```shell
Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
```

#### Current user success response

```shell
Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
```

## Додаткове завдання - необов'язкове

- Зробити пагінацію для колекції контактів (GET /contacts?page=1&limit=20).
- Зробити фільтрацію контактів по полю обраного (GET /contacts?favorite=true)
- Оновлення підписки (`subscription`) користувача через ендпоінт` PATCH`
  `/users`. Підписка повинна мати одне з наступних значень
  `['starter', 'pro', 'business']`

---
