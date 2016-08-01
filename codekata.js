"use strict";

var number = parseInt(process.argv[2], 10),
    valueRemaining = number,
    lengthRemaining = process.argv[2].length,
    str = "",
    valueDealtWith,
    blocksOfThree,
    subNumber,
    subNumberPower;

console.log("converting " + number + " to english");

function digitToWord(digit) {
    switch (digit) {
        case 0:
            return "zero";
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
        case 5:
            return "five";
        case 6:
            return "six";
        case 7:
            return "seven";
        case 8:
            return "eight";
        case 9:
            return "nine";
        default:
            throw "not a digit";
    }
}
function firstDigit(number) {
    return parseInt(number.toString()[0], 10);
}
function getPlaceName(blocksOfThree) {
    switch (blocksOfThree) {
        case 0: return "";
        case 1: return " thousand";
        case 2: return " million";
        case 3: return " billion";
        case 4: return " trillion";
    }
}
function getFirstDigitValue(number) {
    var fd = firstDigit(number);
    return fd * Math.pow(10, Math.floor(Math.log10(number)));
}
function handleSubNumber(number) {
    var valueRemaining = number,
        str = "";

    while(valueRemaining > 0) {
        if (valueRemaining < 10) {
            str += digitToWord(valueRemaining);
            valueDealtWith = valueRemaining;
        } else if (valueRemaining < 20 && valueRemaining >= 10) {
            if (valueRemaining === 10) {
                str += "ten";
            } else if (valueRemaining === 11) {
                str += "eleven";
            } else if (valueRemaining === 12) {
                str += "twelve";
            } else if (valueRemaining === 13) {
                str += "thirteen";
            } else if (valueRemaining === 15) {
                str += "fifteen";
            } else if (valueRemaining === 18) {
                str += "eighteen";
            } else {
                str += digitToWord(valueRemaining - 10) + "teen";
            }
            valueDealtWith = valueRemaining;
        } else if (valueRemaining < 100) {
            if (valueRemaining < 30) {
                str += "twenty ";
            } else if (valueRemaining < 40) {
                str += "thirty ";
            } else if (valueRemaining < 50) {
                str += "forty ";
            } else if (valueRemaining < 60) {
                str += "fifty ";
            } else if (valueRemaining > 80 && valueRemaining < 90) {
                str += "eighty ";
            } else {
                str += digitToWord(firstDigit(valueRemaining)) + "ty ";
            } 
            valueDealtWith = getFirstDigitValue(valueRemaining);
        } else {
            str += digitToWord(firstDigit(valueRemaining)) + " hundred ";
            valueDealtWith = getFirstDigitValue(valueRemaining);
            if(valueRemaining > valueDealtWith) {
                str += "and ";
            }
        }
        valueRemaining -= valueDealtWith;
    }
    return str;
}

while (valueRemaining > 0) {
    valueDealtWith = 0;
    if (valueRemaining >= 1e13) {
        str += "lots";
        break;
    }
    //subNumberPower = (Math.log10(valueRemaining) + 1)%3;
    blocksOfThree = Math.floor((Math.log10(valueRemaining))/3);
    subNumber = Math.floor(valueRemaining / Math.pow(1000, blocksOfThree));
    str += handleSubNumber(subNumber) + getPlaceName(blocksOfThree);
    valueDealtWith = subNumber * Math.pow(1000, blocksOfThree);
    valueRemaining -= valueDealtWith;
    if (valueRemaining > 0){
        if (valueRemaining < 100) {
            str += " and ";
        } else {
            str += ", ";
        }
    }
}

console.log(str);
