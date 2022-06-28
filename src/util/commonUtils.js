function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function getThePercentageDifferenceBetween2Numbers(number1, number2) {
  let diff = 0;
  if (number1 > number2) {
    diff = ((number1 - number2) / number2) * 100;
  } else {
    diff = ((number2 - number1) / number2) * 100;
  }
  return diff;
}

function replaceTheLineBreakCharactersWithASpace(string) {
  return string.replace(/\r?\n|\r/g, " ");
}

function deleteWildcardSearchingSymbol(str) {
  return str.replace("*", "");
}

module.exports = {
  getMultipleRandom,
  getThePercentageDifferenceBetween2Numbers,
  replaceTheLineBreakCharactersWithASpace,
  deleteWildcardSearchingSymbol,
};
