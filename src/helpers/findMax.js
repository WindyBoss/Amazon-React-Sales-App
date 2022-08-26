export function findMax({ list, criteria, noSum = false }) {
    if (noSum) {
        return list.find(
            el =>
            el[criteria] ===
            Math.max(
                ...list.map(market => {
                    return market[criteria];
                })
            )
        );
    } else {
        return list.find(
            el =>
            el[criteria].sum ===
            Math.max(
                ...list.map(market => {
                    return market[criteria].sum;
                })
            )
        );
    }
}