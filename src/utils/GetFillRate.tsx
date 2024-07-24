import roundDown from "./RoundDown"

const propaneDensity = 0.493


function getFillRate(emptyWeight: number, weight: number, volume: number){
    const propaneVol = (weight - emptyWeight) / propaneDensity
    console.log("\new: %s\nw: %s\nv: %s\nresult: %s", emptyWeight, weight, volume, propaneVol / volume)
    return propaneVol / volume
}

function getMaxWeight(emptyWeight: number, volume: number){
    const maxPropVol = volume * propaneDensity
    return emptyWeight + maxPropVol
}

export {getFillRate, getMaxWeight}