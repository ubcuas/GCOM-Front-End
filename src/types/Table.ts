import { SvgIconProps, SxProps, Theme } from "@mui/material";
import { ComponentType } from "react";

export type TableColumn<T> = {
    title?: TableCellContent;
    icon?: ComponentType<SvgIconProps> | boolean;
    accessor?: (row: T) => TableCellContent;

    noStretch?: boolean;
    fadeOnOpen?: boolean;
    sx?: SxProps<Theme>;
};

export type TableCellContent = string | number | React.ReactNode;

export type TableExpansionProps<T> = {
    data: T;
};
