import {useState} from "react";
import {CalculatorPropsModel} from "@/app/models/CalculatorProps.model";

export default function useCalculator({openCalculator, closeCalculator, handleNumber, initialValue}: CalculatorPropsModel) {
    const [code, setCode] = useState(initialValue ? initialValue.toString() : "");

    const handleChange = (value: number) => {
        setCode(code + value);
    };

    const handleSubmit = () => {
        handleNumber && handleNumber(parseInt(code));
        closeCalculator();
    };

    const handleDelete = () => {
        setCode(code.slice(0, -1));
    };
    return {
        code,
        handleChange,
        handleSubmit,
        handleDelete,
    }
}