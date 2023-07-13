# test-Zagroza


Протестировать реализацию API можно через swagger:
http://localhost:3000/api/

Параметры подключения к базе и работы приложения в .env

Импортируемый файл в формате CSV, символ разделитель запятая

Опишу некоторые из них:
<br>UPLOAD_FILES_MAX_SIZE - максимальный размер файла в байтах
<br>UPLOAD_FILES_TYPE     - тип файла (text/csv)
<br>UPLOAD_FILES_PATH     - каталог импорта файла, по умолчанию 'upload'
<br>UPLOAD_FILES_ROWS     - список полей для испорта в БД через запятую


Если в файле отсутствует какое-либо поле из UPLOAD_FILES_ROWS, то файл будет сохранен в каталог.

Если в файле присутствуют все поля, то файл будет импортирован в БД по тем полям, которые указаны в UPLOAD_FILES_ROWS.

При загрузке файла происходит валидация на превышение допустимого размера файла или соответствие типа файла

В UPLOAD_FILES_ROWS могут быть указаны только доступные поля из таблицы в базе Files. Но при этом, в файле могут присутствовать вообще любые поля.

Пример содержимого файла для импорта:
<br>firstName,secondName,country,age
<br>Petrov,Vano,Ukraine,40
<br>Person1,Name1,Ukraine,45
<br>Person2,Name2,Ukraine,44
<br>Person3,Name3,Ukraine,41
<br>Person4,Name4,Germany,42
<br>Person5,Name5,Italy,43

<br>При сохранении файла в каталог будет выведена информация о действии в консоль. В ответ не будет ничего возвращено, т.к. сохранение происходит асинхронно и пользователь не дожидается ответа.
