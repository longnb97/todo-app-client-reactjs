export const Regex = {
    emailRegex:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
    passwordCharacters: 8,
    phoneRegex: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
    nameCharacters: 4,
    phoneNumberCharacters: 8,
}

export function _validateEmail(email) {
  return Regex.emailRegex.test(email);
}

export function _validatePhone(phone) {
  return Regex.phoneRegex.test(phone);
}

export function _maxLength(number, string) {
  return  string.length < number && string.length > 0 ? true : false;
}

export function _minLength(number, string) {
  return  string.length > number && string.length > 0 ? true : false;
}