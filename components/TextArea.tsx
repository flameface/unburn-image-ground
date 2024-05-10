import { Textarea } from "@nextui-org/react";
import React from "react";

export const TextArea = ({ label, placeholder, setNumber, loading }: any) => {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState("");
    const [typingTimeout, setTypingTimeout] = React.useState<any>(null);

    const onChange = (e: any) => {
        const newValue = e.target.value;

        const isNumber = !isNaN(parseInt(newValue));
        if (isNumber) {
            setValue(newValue);
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            setTypingTimeout(
                setTimeout(() => {
                    setNumber(newValue);
                    setError("");
                }, 500)
            );
        } else {
            if (newValue.length > 0) {
                setValue(newValue);
                setError("Must be a number");
            } else {
                setValue(newValue);
                setError("");
            }
        }
    };

    return (
        <Textarea
            minRows={1}
            label={label}
            placeholder={placeholder}
            className="max-w-full"
            errorMessage={error}
            onChange={onChange}
            isInvalid={error ? true : false}
            value={value}
            isDisabled={loading}
        />
    );
};
