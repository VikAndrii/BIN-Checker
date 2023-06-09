const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', () => {
  const numberInput = document.getElementById('card-number');
  const numberValue = numberInput.value;

  // Проверяем, что значение состоит из 6 цифр
  if (/^\d{6}$/.test(numberValue)) {
    const cardNumber = numberValue.toString();
    const url = `https://lookup.binlist.net/${cardNumber}`;

    fetch(url, {
      headers: {
        'Accept-Version': '3'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Обработка ответа от сервера
        console.log(data);

        const relevantData = {
          "ПЛАТІЖНА СИСТЕМА": data.scheme,
          "ТИП КАРТИ": data.type,
          "КАТЕГОРІЯ КАРТИ": data.brand,
          "КРАЇНА": data.country.name,
          "ВАЛЮТА": data.country.currency
        };

        const listElement = document.createElement('ul');
        for (const [key, value] of Object.entries(relevantData)) {
          const itemElement = document.createElement('li');
          itemElement.textContent = `${key}: ${value}`;
          listElement.appendChild(itemElement);
        }

        const resultElement = document.getElementById('result-data');
        resultElement.innerHTML = '';
        resultElement.appendChild(listElement);

        // Очищаем поле ввода
        numberInput.value = '';
      })
      .catch(error => {
        // Обработка ошибки
        console.error(error);
        alert('Карта не найдена!');

        // Очищаем поле ввода
        numberInput.value = '';
      });
  } else {
    // Выводим сообщение об ошибке
    alert('Введите шесть цифр!');

    // Очищаем поле ввода
    numberInput.value = '';
  }
});