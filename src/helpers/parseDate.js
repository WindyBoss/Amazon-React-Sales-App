export const parseDate = (data, criteria) => {
  if (!data) {
    return;
  }

  data.forEach((el) => {
    el.purchaseDate = new Date(
      el[criteria].slice(6, 10),
      el[criteria].slice(3, 5),
      el[criteria].slice(0, 2)
    );
  });

  return data;
};

export const parseDates = (date) => {
  if (!date) {
    return;
  }
  const newDate = new Date(
    date.slice(6, 10),
    date.slice(3, 5) - 1,
    date.slice(0, 2)
  );

  return newDate;
};
