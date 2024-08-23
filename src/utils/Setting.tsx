import getGrillHours from "@/utils/GetGrillHours";

class KnobOption {
    private constructor(public readonly name: string, public readonly degree: number) {}

    static readonly Low = new KnobOption('Low', -90);
    static readonly Medium = new KnobOption('Medium', 0);
    static readonly High = new KnobOption('High', 90);

    static getAllOptions() {
        return [this.Low, this.Medium, this.High]
    }
}

function getClosestOption(degree: number): KnobOption{
    const deg = getClosestDegree(degree)
    return KnobOption.getAllOptions().find(option => option.degree === deg) || KnobOption.Medium;
}

function getAllDegrees() {
    return [KnobOption.Low.degree, KnobOption.Medium.degree, KnobOption.High.degree]
}

function getClosestDegree(degree: number): number{
    return getAllDegrees().reduce((prev, curr) => Math.abs(curr - degree) < Math.abs(prev - degree) ? curr : prev);
}


export {KnobOption, getClosestOption, getClosestDegree, getAllDegrees}