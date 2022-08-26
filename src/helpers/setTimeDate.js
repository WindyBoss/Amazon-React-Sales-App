export default function setTimeDate(min, max) {
  const minParsed = new Date(
    min.slice(6, 10),
    min.slice(3, 5),
    min.slice(0, 2)
  );

  const maxParsed = new Date(
    max.slice(6, 10),
    max.slice(3, 5),
    max.slice(0, 2)
  );

  return { minParsed, maxParsed };
}
