function closestDegreeWorklet(num: number, arr: number[]) {
    "worklet"
    return arr.reduce((prev, curr) => Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
}

export default closestDegreeWorklet