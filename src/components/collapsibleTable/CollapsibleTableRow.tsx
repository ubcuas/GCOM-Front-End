import { Box, Collapse, IconButton, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import { Children, ComponentType } from "react";
import { TableColumn, TableExpansionProps } from "../../types/Table";
import useOpen from "../../utils/hooks/useOpen";
import ChevronIcon from "../ChevronIcon";
import CollapsibleTableCell from "./CollapsibleTableCell";

type CollapsibleTableRowProps<T> = {
    columns: TableColumn<T>[];
    row: T;
    expansion?: ComponentType<TableExpansionProps<T>>;
};

const CollapsibleTableRow = <T,>({ columns, row, expansion: Expansion }: CollapsibleTableRowProps<T>) => {
    const theme = useTheme();
    let isOpen = false;
    let toggleOpen;

    if (Expansion) {
        const openHook = useOpen();
        isOpen = openHook.isOpen;
        toggleOpen = openHook.toggleOpen;
    }

    const border = { borderBottomColor: theme.palette.divider };
    const borderSx = Expansion ? { borderBottom: "unset" } : border;

    return (
        <>
            <TableRow sx={{ height: "41px", "& td": borderSx }}>
                {!!Expansion && (
                    <TableCell width="28px" sx={{ paddingLeft: 0.5, paddingRight: 0 }}>
                        <IconButton size="small" onClick={toggleOpen}>
                            <ChevronIcon isOpen={isOpen} />
                        </IconButton>
                    </TableCell>
                )}
                {Children.toArray(
                    columns.map((column) => (
                        <CollapsibleTableCell
                            {...column}
                            data={column.accessor ? column.accessor(row) : undefined}
                            width={column.noStretch ? "1px" : undefined}
                            isOpen={isOpen}
                        />
                    ))
                )}
            </TableRow>
            {!!Expansion && (
                <TableRow sx={{ "& td": border }}>
                    <TableCell colSpan={columns.length + 1} sx={{ padding: 0 }}>
                        <Collapse in={isOpen}>
                            <Typography variant="body2" component={Box} sx={{ padding: theme.spacing(0, 2, 1, 2) }}>
                                <Expansion data={row} />
                            </Typography>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default CollapsibleTableRow;
