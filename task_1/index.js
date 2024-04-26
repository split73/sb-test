import { encoded, translations, decodeData, getUniqueIds } from './data.js';

const decoded = decodeData(encoded, translations);
// console.log(decoded);

console.log("Let's rock");

const uniqueIds = getUniqueIds(encoded, translations);
console.log(uniqueIds);  

