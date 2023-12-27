export function hidePhone(phone) {
  phone = phone + ''
  const replaceSymbol = '****'
  const result = phone.substr(0, 3) + replaceSymbol + phone.substr(7)
  return result
}
