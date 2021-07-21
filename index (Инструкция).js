/*
в случае если ваш браузер не поддерживает это API (SpeechRecognition), то мы можем
принудительно записать свойство SpeechRecognition в объект window , где спросим если оно есть записывай его, если нет
то используй webkitSpeechRecognition
*/
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// создаем экземпляр класса и записываем в переменную, чтобы изучить дальше
var recognition = new SpeechRecognition();
// свойство interimResults позволяем видеть промежуточные результаты поиска
recognition.interimResults = true;
// настраиваем язык распознавания (обратите внимание на формат)
recognition.lang = 'en-US';

// создаем элемент параграф, чтобы записывать в него результаты поиска
var p = document.createElement('p');
// добираемся к DOM элементу
var words = document.querySelector('.words');
// помещаем параграф в родительский элемент
words.appendChild(p);

// вместе с началом работы микрофона, у нас вызывается событие result
recognition.addEventListener('result', function (event) {
  // здесь мы добираемся до нужного текста, который распознан и записываем в параграф
  p.textContent = Array
    .from(event.results)
    .map(function (results) {
      return results[0];
    })
    .map(function (results) {
      return results.transcript;
    })
    .join('');

  // специальное свойство isFinal станет true как только сделаем паузу на мгновение
  if(event.results[0].isFinal) {
    // в этом случае у нас каждое произнесенное слово будет начинаться с новой строки
    // для этого создаем новый параграф
    p = document.createElement('p');
    // и записываем в родительский элемент
    words.appendChild(p);
  }
});

// событие end вызывается как только замолкаем, но чтобы микрофон продолжал работать и
// не выключился, мы каждый раз запускаем его заново (recognition.start)
recognition.addEventListener('end', recognition.start);
// как только загружается страница, мы запрашиваем доступ к микрофону и он слушает нашу речь
recognition.start();