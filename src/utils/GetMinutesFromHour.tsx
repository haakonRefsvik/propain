function getMinutesFromHour(hour: number): number{
    const fraction = hour - Math.floor(hour)
    return Math.floor(fraction * 60)
}

export default getMinutesFromHour