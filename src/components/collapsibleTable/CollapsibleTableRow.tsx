import { Box, Collapse, IconButton, TableCell, TableRow, useTheme } from "@mui/material";
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
    const { isOpen, toggleOpen } = useOpen();

    const rowSx = Expansion ? { "& td": { borderBottom: "unset" } } : undefined;

    return (
        <>
            <TableRow sx={{ height: "41px", ...rowSx }}>
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
                            type={column.type}
                            isOpen={isOpen}
                            data={column.accessor(row)}
                            sx={column.cellSx}
                            width={column.noStretch ? "1px" : undefined}
                        />
                    ))
                )}
            </TableRow>
            {!!Expansion && (
                <TableRow>
                    <TableCell colSpan={columns.length + 1} sx={{ padding: 0 }}>
                        <Collapse in={isOpen}>
                            <Box sx={{ padding: theme.spacing(0, 2, 1, 2) }}>
                                <Expansion data={row} />
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default CollapsibleTableRow;
