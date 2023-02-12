import InfoIcon from "@mui/icons-material/Info";
import { Fade, SvgIconProps, SxProps, TableCell, Theme, Tooltip } from "@mui/material";
import { ComponentType } from "react";
import { TableCellContent } from "../../types/Table";

type CollapsibleTableCellProps = {
    data?: TableCellContent;
    width?: string;
    isOpen?: boolean;
    icon?: ComponentType<SvgIconProps> | boolean;
    fadeOnOpen?: boolean;
    sx?: SxProps<Theme>;
};

const CollapsibleTableCell: React.FC<CollapsibleTableCellProps> = ({
    data,
    width,
    isOpen,
    icon: Icon,
    fadeOnOpen,
    sx,
}) => {
    const getContent = () => {
        const innerContent = getInnerContent();
        return fadeOnOpen && innerContent ? <Fade in={!isOpen}>{innerContent}</Fade> : innerContent;
    };

    const getInnerContent = () => {
        if (!Icon) {
            return <span>{data}</span>;
        } else if (data) {
            if (typeof Icon === "boolean") Icon = InfoIcon;
            return (
                <Tooltip title={data} placement="left" arrow>
                    <Icon fontSize="inherit" sx={{ marginTop: "2px", marginBottom: "-2px", cursor: "pointer" }} />
                </Tooltip>
            );
        }
    };

    return (
        <TableCell sx={sx} width={width}>
            {getContent()}
        </TableCell>
    );
};

export default CollapsibleTableCell;
