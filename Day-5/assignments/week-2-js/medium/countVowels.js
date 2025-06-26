/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const vowels = ["a", "e", "i", "o", "u"];
    const lowerStr = str.toLowerCase().split("");
    let vowelCount = 0;

    for(let i=0; i<lowerStr.length; i++){
      for(let j=0; j<vowels.length; j++){
        if(vowels[j] === lowerStr[i]) vowelCount++;
      } 
    }

    return vowelCount;
}

module.exports = countVowels;