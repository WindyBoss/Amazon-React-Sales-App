export default function filterData({ max, min, data, months }) {
    const newData = data[0].dayData.filter((timeP) => {
        const timeDate = new Date(
            Number(timeP.id.slice(timeP.id.length > 10 ? 7 : 6, 11)),
            Number(
                months.filter(
                    (m) =>
                    m.id ===
                    timeP.id.slice(
                        timeP.id.indexOf('/') + 1,
                        timeP.id.length > 10 ? 6 : 5,
                    ),
                )[0].month - 1,
            ),
            Number(timeP.id.slice(0, timeP.id.indexOf('/'))),
        )

        return timeDate <= max && timeDate >= min
    })
    return newData
}