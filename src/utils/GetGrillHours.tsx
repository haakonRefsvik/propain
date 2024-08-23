import { KnobOption } from "@/utils/Setting";

const hoursPerKiloPropane = {low: 1.19, medium : 2.6, high: 4.75}


function getGrillHours(emptyWeight: number, weight: number, setting: KnobOption): number {
    const netWeight = weight - emptyWeight;
    const hoursLow = netWeight * hoursPerKiloPropane.high;
    const hoursMed = netWeight * hoursPerKiloPropane.medium;
    const hoursHigh = netWeight * hoursPerKiloPropane.low;

    if(setting == KnobOption.Low)
        return hoursLow

    if(setting == KnobOption.Medium){
        return hoursMed
    }

    if(setting == KnobOption.High){
        return hoursHigh
    }

    return 0
}

export default getGrillHours