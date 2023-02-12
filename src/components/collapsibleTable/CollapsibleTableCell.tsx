import InfoIcon from "@mui/icons-material/Info";
import { Fade, SxProps, TableCell, Theme, Tooltip } from "@mui/material";
import { TableColumnType, TableCellContent } from "../../types/Table";

type CollapsibleTableCellProps = {
    type?: TableColumnType;
    data?: TableCellContent;
    width?: string;
    sx?: SxProps<Theme>;
    isOpen?: boolean;
};

const CollapsibleTableCell: React.FC<CollapsibleTableCellProps> = ({ type, data, width, sx, isOpen }) => {
    switch (type) {
        case TableColumnType.Info:
            return (
                <TableCell width={width} sx={{ ...sx }}>
                    {data ? (
                        <Fade in={!isOpen}>
                            <Tooltip title={data} placement="left" arrow>
                                <InfoIcon
                                    fontSize="inherit"
                                    sx={{ marginTop: "2px", marginBottom: "-2px", cursor: "pointer" }}
                                />
                            </Tooltip>
                        </Fade>
                    ) : undefined}
                </TableCell>
            );
        default:
            return <TableCell sx={sx}>{data}</TableCell>;
    }
};

export default CollapsibleTableCell;
