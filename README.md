## Customers relationships  managment. Skillbox baseJS course project JS 

## Работа с проектом
Для запуска проекта пожалуйста выполните следующие действия:

1. Склонироваать проект на ваш компьюте с Github c помощью команды: 
    >git clone https://github.com/MikeChe419/JS-course-work-CRM

2. Установить зависимости:
    >npm install 

3. Из дирректории crm-backend  в терминале выполнить команду:
    > node index.js

4. Запуск клиентской части проекта из дирректории crm-frontend командой 
    >gulp

## Функционал проекта
Просмотр списка клиентов в виде таблицы
Добавление нового клиента
Изменение информации о существующем клиенте
Каждый контакт представляет из себя следующий набор данных:
Имя
Фамилия
Отчество
Массив объектов с контактными данными, где каждый объект содержит:
Тип контакта (телефон, email, VK и т.п.)
Значение контакта (номер телефона, адрес email, ссылка на страницу в VK и т.п.)
Интерфейс представляет из себя единственную страницу, на которой располагается таблица клиентов, кнопка для добавления нового клиента, а также шапка с логотипом компании и строкой поиска клиентов.


###Таблица со списком клиентов
Таблица со списком  имеет следующие колонки:
ID
ФИО
Дата и время создания
Дата и время последнего изменения
Контакты
Действия (кнопки)
Изменить клиента
Удалить клиента
Таблица  строится на основе данных из API

###Coртировка
Все заголовки колонок, кроме контактов и действий, можно нажать, чтобы установить сортировку по соответствующему полю. Первое нажатие устанавливает сортировку по возрастанию, повторное - по убыванию.

###Поиск
При вводе текста в поле для поиска данные для таблицы должны быть перезапрошены из API с введённым поисковым запросом. 
Отображение контактов клиента

###Действия над клиентами
"Изменить" - модалное окно с формой изменения клиента с возможностью удаления

"Удалить" - модальное окно с подтверждением действия. Если пользователь подтверждает удаление, то человек должен быть удалён из списка. Также на сервер с API должен посылаться запрос на удаление.

"Добавить"- модальное окно создания клиента

###Контакты клиента
В блоке контактов нужно предусмотреть возможность добавления до 10 контактов включительно. Для этого под добавленными контактами должна быть кнопка "Добавить контакт". Если у клиента уже добавлено 10 контактов, кнопка не должна отображаться.


##Обработка ошибок ответа сервера:
Если сохранение прошло успешно (статус ответа 200 или 201), модальное окно с формой закрывается. При этом таблица должна быть отрисована заново с новым запросом на список людей.
Если при сохранении произошла ошибка (статус ответа 422, 404 или 5xx), то нужно отобразить сообщения об ошибках, полученные в ответе сервера, над блоком с кнопками. При этом если ответ сервера не удалось разобрать или в нём нет сообщений об ошибке, нужно отобразить сообщение по умолчанию "Что-то пошло не так...".
По нажатию на кнопку с крестиком, кнопку отмены или фон модального окна модальное окно должно закрыться.