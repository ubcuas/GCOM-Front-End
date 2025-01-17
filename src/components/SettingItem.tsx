import { MenuItem, Select, SelectChangeEvent, Stack, Switch, TextField, Typography } from "@mui/material";

type ToggleSettingItemProps = {
    name: string;
    type: "toggle";
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
};

type SelectSettingItemProps = {
    name: string;
    type: "select";
    onChange: (event: SelectChangeEvent) => void;
    options: string[];
    value: string;
    optionColors?: string[];
};

type TextFieldSettingItemProps = {
    id: string;
    name: string;
    type: "text";
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    error?: boolean;
};

type SettingItemProps = ToggleSettingItemProps | SelectSettingItemProps | TextFieldSettingItemProps;

export default function SettingItem(props: SettingItemProps) {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            {props.type === "toggle" && <ToggleSettingItem {...props} />}
            {props.type === "select" && <SelectSettingItem {...props} />}
            {props.type === "text" && <TextFieldSettingItem {...props} />}
        </Stack>
    );
}

function ToggleSettingItem({ name, onChange, checked }: ToggleSettingItemProps) {
    return (
        <>
            <Typography variant="body1">{name}</Typography>
            <Switch checked={checked} onChange={onChange} />
        </>
    );
}

function SelectSettingItem({ name, onChange, options, value, optionColors }: SelectSettingItemProps) {
    return (
        <>
            <Typography variant="body1">{name}</Typography>
            <Select
                onChange={onChange}
                value={value}
                displayEmpty
                sx={{
                    height: 36,
                    width: 120,
                    backgroundColor: (optionColors && optionColors[options.indexOf(value)]) || "initial",
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}

function TextFieldSettingItem({ name, onChange, value, id, error }: TextFieldSettingItemProps) {
    return (
        <>
            <Typography variant="body1">{name}</Typography>
            <TextField
                error={error}
                id={id}
                size="small"
                sx={{ width: 120 }}
                onChange={onChange}
                type="text"
                value={value}
            />
        </>
    );
}
