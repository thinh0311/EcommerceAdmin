const formatDate = (string) => {
  const day = string.substring(8, 10);
  const month = string.substring(5, 7);
  const year = string.substring(0, 4);
  return `${day}-${month}-${year}`;
};

const convertDateToSql = (string) => {
  const day = string.substring(8, 10);
  const month = string.substring(5, 7);
  const year = string.substring(0, 4);
  return `${day}-${month}-${year}`;
};

const formatCurency = (n, sep) => {
  sep = sep || "."; //

  return n.toLocaleString().split(sep)[0];
};

const ultils = { formatDate, convertDateToSql, formatCurency };
export default ultils;
