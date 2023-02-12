import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Children, ComponentType } from "react";
import { TableColumn, TableExpansionProps } from "../types/Table";
import CollapsibleTableRow from "./collapsibleTable/CollapsibleTableRow";

type CollapsibleTableProps<T> = {
    columns: TableColumn<T>[];
    rows: T[];
    expansion?: ComponentType<TableExpansionProps<T>>;
};

const CollapsibleTable = <T,>({ columns, rows, expansion }: CollapsibleTableProps<T>) => {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    {!!expansion && <TableCell />}
                    {Children.toArray(
                        columns.map((column) => (
                            <TableCell
                                width={column.noStretch ? "1px" : undefined}
                                sx={{ fontWeight: 700, ...column.sx }}
                            >
                                {column.title}
                            </TableCell>
                        ))
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {Children.toArray(
                    rows.map((row) => <CollapsibleTableRow columns={columns} row={row} expansion={expansion} />)
                )}
            </TableBody>
        </Table>
    );
};

export default CollapsibleTable;
