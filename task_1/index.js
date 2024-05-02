import { encoded, translations } from "./data.js";

console.log("Let's rock");
decoder(encoded, translations);

function decoder(encoded, translations) {
  const uniqueIDs = new Set();
  encoded.forEach((card) => {
    for (let key in card) {
      uniqueIDs.add(card[key]);
      for (let id in translations) {
        uniqueIDs.has(id) ? uniqueIDs.delete(id) : id;
        if (card[key] === id) {
          card[key] = translations[id];
          break;
        }
      }
    }
  });
  console.log(encoded);
  console.log(uniqueIDs);
}

