
const hoursPerKiloPropane = {low: 1.19, medium : 2.6, high: 4.75}

function getGrillHours(emptyWeight: number, weight: number) {

    const netWeight = weight - emptyWeight;
    const hoursLow = netWeight * hoursPerKiloPropane.low;
    const hoursMed = netWeight * hoursPerKiloPropane.medium;
    const hoursHigh = netWeight * hoursPerKiloPropane.high;

    return { low: hoursHigh, med: hoursMed, high: hoursLow };
}

export default getGrillHours