import { Stack, Switch, Typography } from "@mui/material";

type SettingItemProps = {
    name: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
};

export default function SettingItem({ name, type, onChange, checked }: SettingItemProps) {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">{name}</Typography>
            {type === "toggle" && <Switch checked={checked} onChange={onChange} />}
        </Stack>
    );
}
