function generateId(list) {
  return (list.length + 1).toString();
}

function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function createId(items) {
  return (items.length + 1).toString();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function paginateArray(list, { limit = 10, offset = 0 } = {}) {
  return list.slice(offset, offset + Math.min(limit, 50));
}

function sortByField(list, field, direction = "ASC") {
  if (!field) return list;
  const sortedList = [...list].sort((a, b) => {
    if (a[field] < b[field]) return direction === "ASC" ? -1 : 1;
    if (a[field] > b[field]) return direction === "ASC" ? 1 : -1;
    return 0;
  });
  return sortedList;
}

module.exports = { createId, validateEmail, paginateArray, sortByField };

function paginate(array, { limit = 10, offset = 0 } = {}) {
  return array.slice(offset, offset + Math.min(limit, 50));
}

function sort(array, sortBy, order = "ASC") {
  if (!sortBy) return array;
  const sorted = [...array].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === "ASC" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === "ASC" ? 1 : -1;
    return 0;
  });
  return sorted;
}

module.exports = { generateId, isEmailValid, paginate, sort };
