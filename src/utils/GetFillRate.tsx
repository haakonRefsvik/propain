import roundDown from "./RoundDown"

const propaneDensity = 0.493


function getFillRate(emptyWeight: number, weight: number, volume: number){
    console.log("\new: %s\nw: %s\nv: %s", emptyWeight, weight, volume)
    const propaneVol = (weight - emptyWeight) / propaneDensity
    return roundDown(propaneVol / volume, 2) 
}

export default getFillRate