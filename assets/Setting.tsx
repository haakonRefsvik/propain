class KnobOption {
    private constructor(public readonly name: string, public readonly degree: number) {}

    static readonly Low = new KnobOption('Low', -90);
    static readonly Medium = new KnobOption('Medium', 0);
    static readonly High = new KnobOption('High', 90);

    static getAllDegrees() {
        return [this.Low.degree, this.Medium.degree, this.High.degree]
    }
}

export default KnobOption