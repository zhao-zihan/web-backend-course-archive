const words =
  `about  began  carry  drive early  field great  heard  large  might`
    .split(/[\s\n]+/)
    .filter((item) => !!item);

module.exports = words;
