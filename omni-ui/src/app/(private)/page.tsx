'use client'
import * as React from 'react';
import {Suspense} from 'react';
import Box from '@mui/material/Box';
import {Tab, Tabs} from "@mui/material";
import CustomTabPanel from "@/components/Tabs/CustomTabPanel";

const LazyEventSubscriptionTable = React.lazy(()=> import("@/components/Dashboard/EventSubscriptionTable"))

export default function HomePage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{height: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Past events"/>
                    <Tab label="Upcoming events" />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Suspense fallback={<span>Loading...</span>}>
                    <LazyEventSubscriptionTable pastDates={true} />
                </Suspense>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Suspense fallback={<span>Loading...</span>}>
                    <LazyEventSubscriptionTable pastDates={false} />
                </Suspense>
            </CustomTabPanel>
        </Box>
    );
}
