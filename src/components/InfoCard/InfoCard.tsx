import { Divider, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

export default function InfoCard({ title, children }: { title: string; children?: React.ReactNode }) {
    return (
        <Paper
            sx={{
                height: "100%",
            }}
        >
            <List>
                <ListItem>
                    <ListItemText>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                            }}
                            variant="h5"
                        >
                            {title}
                        </Typography>
                    </ListItemText>
                </ListItem>
                <Divider />
                {children}
            </List>
        </Paper>
    );
}