import {encoded, translations} from './data.js'

const notTranslate = [
    'groupId', 'service', 'formatSize', 'ca'
]

function uniqueId(data, translations){
    const unique = []
    for(let key in translations){
        let count = 0;

        for(let obj of data){
            for(let dataKey in obj){
                if(key == obj[dataKey])
                    count++

                if(count > 1)
                    break
            }
            if(count > 1)
                break
        }
        if(count == 1)
            unique.push(key)
    }
    return unique
}

function translate(data, translations, notTranslate = []){
    for(let code of data)
        for (let key in code) 
            if(!notTranslate.find((item, index)=>item === key))
                code[key] = translations[code[key]]

    return data
}

const data = JSON.parse(JSON.stringify(encoded))
const result = translate(data, translations, notTranslate)
console.log(result)

console.log("список уникальных id: ",uniqueId(encoded, translations))