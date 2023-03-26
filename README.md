# Проект: Место
### Предназначение
Аттесстационный проект промежуточных спринтов курса [Web-разработчик](https://practicum.yandex.ru/web/).

[По этой ссылке вы можете ознакомиться с результатом работы на Github Pages](https://ruslan-mihalev.github.io/mesto/)


**Фукционал**
* Редактирование информации в профиле пользователя
* Добавление удаление карточек с направлениями
* Простановка лайка карточкам
* Открытие изображения карточки на весь экран

**Структура**
* Заголовок
* Профайл
* Сетка карточек направлений
* Подвал

**Содержание**
Сайт-галерея о путешественнике и путешествиях

**Технологии**
* BEM
* flex layout
* grid layout
* media queries
* подход mobile first
* custom fonts
* transition animation
* использование max-width вместо width (где это возможно)
* использование списков для перечисляемых элементов
* popup
* form
* JavaScript

Для сборки проекта использовано окружение NodeJS, пакетный менеджер NPM и сборщик Webpack.
Если хотите так-же - привожу список команд установки пакетов ниже:

#### Инициализация NPM окружения проекта

```npm init --yes```

#### Установка сборщика Webpack

```npm i webpack --save-dev```

#### Очистка содержимого папки после каждой сборки

```npm i clean-webpack-plugin --save-dev```

#### Транспилияция JavaScript кода

```npm i @babel/core --save-dev```
```npm i @babel/preset-env --save-dev```
```npm i core-js --save```
```npm i babel-loader --save-dev```

#### Обработка HTML

```npm i html-webpack-plugin --save-dev```

####  Обработка шрифтов и изображений доступна из коробки и не требует установки дополнительных плагинов

#### Обработка CSS

```npm i css-loader --save-dev```
```npm i mini-css-extract-plugin --save-dev```


#### PostCSS + минификация + вендорные префиксы*

```npm i postcss-loader --save-dev```
```npm i autoprefixer --save-dev```
```npm i cssnano --save-dev```

### Продемонстрирована работа с сетью

#### Загрузка информации о пользователе с сервера
```GET https://nomoreparties.co/v1/cohortId/users/me```

#### Загрузка карточек с сервера
```GET https://mesto.nomoreparties.co/v1/cohortId/cards```

#### Редактирование профиля
```PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me```

#### Добавление новой карточки
```POST https://mesto.nomoreparties.co/v1/cohortId/cards```

#### Удаление карточки
```DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId```

#### Постановка лайка
```PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes```

#### Снятие лайка
```DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes```

#### Обновление аватара пользователя
```PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar```
