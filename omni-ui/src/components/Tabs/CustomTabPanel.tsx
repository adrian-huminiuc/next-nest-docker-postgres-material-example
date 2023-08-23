'use client'
import Box from "@mui/material/Box";
import * as React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <>{children}</>}
        </Box>
    );
}