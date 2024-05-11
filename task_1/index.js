import { encoded, translations } from "./data.js";
decoder(encoded, translations);
function decoder(encoded, translations) {
  const uniqueIds = [];
  for (let i = 0; i < encoded.length; i++) {
    for (const [key, value] of Object.entries(encoded[i])) {
      if (
        key !== "_groupId_" ||
        key !== "_service_" ||
        key !== "_formatSize_" ||
        key !== "_ca_"
      ) {
        let keySubstring = key.substring(key.length - 2, key.length);
        if (keySubstring === "Id") {
          let newValue = translations[value];
          if (newValue === undefined && value !== null) {
            uniqueIds.push(value);
          } else {
            encoded[i][key] = translations[value];
          }
        }
      }
    }
  }
  console.log(encoded, uniqueIds);
}

// Необходимо написать функцию расшифровки полей с суффиксом id из переменной _encoded_, используя словарь с расшифровками _translations_.

// При этом структура данных должна сохраниться в виде списка объектов с теми же ключами.

// Некоторые поля при раскодировании нужно исключить и оставить в изначальном виде: _groupId_, _service_, _formatSize_ и _ca_

// Также необходимо вывести список уникальных id, из _encoded_ (можно использовать _translations_ для проверки).
