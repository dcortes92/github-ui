/**
 * Converts a date object to string with `yyyy-mm-dd` format
 * @param {object} date The date object to format
 */
export const formatDate = date => {
  if(date && typeof date === 'object') {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return year + '-' + (month <=9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);
  } else {
    throw new TypeError('Not a valid date');
  }
}