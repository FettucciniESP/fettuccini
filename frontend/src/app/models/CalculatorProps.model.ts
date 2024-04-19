export interface CalculatorPropsModel {
    openCalculator: boolean;
    closeCalculator: () => void;
    handleNumber: (value: number) => void;
}