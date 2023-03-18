import { Link } from "@mui/material";
import { PropsWithChildren } from "react";
import { Link as WouterLink } from "wouter";

type InternalLinkProps = {
    href: string;
};

const InternalLink: React.FC<PropsWithChildren<InternalLinkProps>> = ({ href, children }) => {
    return (
        <WouterLink href={href}>
            <Link>{children}</Link>
        </WouterLink>
    );
};

export default InternalLink;
