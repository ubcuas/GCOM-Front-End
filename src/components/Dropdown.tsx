import { FormControl, InputLabel, Select } from "@mui/material";
import { PropsWithChildren } from "react";

type DropdownProps<T> = {
    id: string;
    label: string;
    value: T;
    onChange: (value: T) => void;
};

const Dropdown = <T,>({ id, label, value, onChange, children }: PropsWithChildren<DropdownProps<T>>) => {
    const labelId = `${id}-label`;
    return (
        <FormControl>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                label-id={labelId}
                label={label}
                id={id}
                value={value}
                onChange={(event) => onChange(event.target.value as T)}
            >
                {children}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
