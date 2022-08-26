export function remadeDate(day, months) {
    const timeDate = new Date(
        Number(day.date.slice(day.date.length > 10 ? 7 : 6, 11)),
        Number(
            months.filter(
                (m) =>
                m.id ===
                day.date.slice(
                    day.date.indexOf('/') + 1,
                    day.date.length > 10 ? 6 : 5,
                ),
            )[0].month,
        ),
        Number(day.date.slice(0, day.date.indexOf('/'))),
    );

    console.log(timeDate);

    return timeDate
}