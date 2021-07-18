/**
 * Helper fn used to return Stringify value to compare correctly
 * @param {*} value 
 * @returns 
 */
const stringifyValue = (value) => {
  if (value === null) return "";
  if (typeof value === "number") return value.toString();
  return value;
}

const equals = (productValue, value) => {
  if (value.length === 0) {
    if (!productValue) return true;
    return false;
  }
  productValue = stringifyValue(productValue);
  return value[0].toUpperCase() === productValue.toUpperCase();
}

const greaterThan = (productValue, value) => {
  return value < productValue;
}

const lessThan = (productValue, value) => {
  return value > productValue;
}

const any = (productValue) => {
  return productValue !== null
}

const none = (productValue) => {
  return productValue === null
}

//need to change fn to 'within' instead of id: 'in' since 'in' is js keyword
const within = (productValue, valueArr) => {
  if (valueArr.length === 0) return false
  let match = false;
  productValue = stringifyValue(productValue);
  valueArr.forEach(value => {
    value = value === "null" ? "" : value
    if (value.toUpperCase() === productValue.toUpperCase()) {
      match = true
    }
  })
  return match;
}

const contains = (productValue, value) => {
  if (value.length === 0) return false
  return productValue.toUpperCase().includes(value[0].toUpperCase());
}

export {
  equals,
  greaterThan,
  lessThan,
  any,
  none,
  within,
  contains
}