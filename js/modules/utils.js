import { MAX_DIGITS, MAX_NUMBER, MIN_NUMBER } from "./constants.js";

export function truncate(number) {
  if (!isFinite(number)) {
    alert("Division by zero!");
    return "Are you serious?";
  }

  const str = String(number);
  if (str.length <= MAX_DIGITS) return str;

  const isDecimal = str.includes(".");

  if (isDecimal) {
    return String(+str.slice(0, MAX_DIGITS));
  } else {
    const scientificNumber = roundUsingScientificNotation(number);

    if (+scientificNumber > MAX_NUMBER) return "Infinity";
    else if (+scientificNumber < MIN_NUMBER) return "-Infinity";
    else return scientificNumber;
  }
}

function roundUsingScientificNotation(number) {
  const order = String(number).length - 1;
  const orderNotation = `e+${order}`;
  const prefix = String(number / 10 ** order).slice(
    0,
    MAX_DIGITS - orderNotation.length,
  );
  return prefix + orderNotation;
}
