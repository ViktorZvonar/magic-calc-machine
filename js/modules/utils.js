import { MAX_DIGITS, MAX_NUMBER, MIN_NUMBER } from "./constants.js";

export function truncate(number) {
  const str = String(number);
  if (str.length <= MAX_DIGITS) return str;

  const isDecimal = str.includes(".");
  const isScientificNotation = str.includes("e");

  if (isScientificNotation) {
    if (number > MAX_NUMBER) return "Infinity";
    else if (number < MIN_NUMBER) return "-Infinity";
    else return str;
  } else if (isDecimal) {
    return String(+str.slice(0, MAX_DIGITS));
  } else {
    return roundUsingScientificNotation(number);
  }
}

function roundUsingScientificNotation(number) {
  const order = String(number).length - 1;
  const orderNotation = `e+${order}`;
  const prefix = String(number / 10 ** order).slice(
    0,
    MAX_DIGITS - orderNotation.length,
  );
  const scientificNumber = prefix + orderNotation;

  if (+scientificNumber > MAX_NUMBER) return "Infinity";
  else if (+scientificNumber < MIN_NUMBER) return "-Infinity";
  else return scientificNumber;
}
