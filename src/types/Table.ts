import { SxProps, Theme } from "@mui/material";

export type TableColumn<T> = {
    title?: TableCellContent;
    type?: TableColumnType;
    noStretch?: boolean;
    cellSx?: SxProps<Theme>;
    accessor: (row: T) => TableCellContent;
};

export enum TableColumnType {
    Info = "info",
}

export type TableCellContent = string | number | React.ReactNode;

export type TableExpansionProps<T> = {
    data: T;
};
