
const fs = require('fs')
const data = fs.readFileSync('./english_words.txt', 'utf8')
function keypadToWords(keyStrokes) {
    let wordDictionary = data.split(/\r\n/)
    let result = [];
    let keyStrokesArray = [];
    let keyMap = {
        "2": ["a","b","c"],
        "3": ["d","e","f"],
        "4": ["g","h","i"],
        "5": ["j","k","l"],
        "6": ["m","n","o"],
        "7": ["p","q","r","s"],
        "8": ["t","u","v",],
        "9": ["w","x","y","z"]
    }
    for(let char of keyStrokes){
        if(char in keyMap){
            keyStrokesArray.push(keyMap[char])
        }   
    }
    if(keyStrokes.length === 1)return keyMap[keyStrokes]
    if(keyStrokes.length == 0) return "";
    result = keyStrokesArray.shift()
    let possibleWords = helper(result,keyStrokesArray).flat()
    let wordsFound = possibleWords.filter(item => wordDictionary.includes(item))
    return wordsFound
}
function helper(result,keyStrokesArray){
    if(keyStrokesArray.length == 0 || !result){
        return result
    }
    let combinationsArray = [];
    let prefix;
    for(let i=0; i<result.length; i++){
        prefix = result[i]
        for(let j = 0; j<1; j++){
            for(let k = 0; k<keyStrokesArray[0]?.length; k++ ){
                prefix = prefix+ keyStrokesArray[0][k]
                combinationsArray.push([prefix])
                prefix = result[i]
                
            }
        } 
    }
    if(keyStrokesArray.length == 1 ){
        return combinationsArray
    }
    keyStrokesArray.shift()
    return helper(combinationsArray,keyStrokesArray)
}

console.log(keypadToWords("43556"))