'use client';

import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridToolbarContainer} from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import {ListEventsGridColumnsDef} from "@/lib/events/list/list-events.grid-columns-def";
import useSWR from "swr";
import {ListEventsFetcher} from "@/lib/events/list/list-events.fetcher";

function CustomToolbar() {
    return (
        <GridToolbarContainer sx={{
            display: 'flex',
            justifyContent: 'right',
        }}>
            <Button variant="outlined" startIcon={<AddIcon/>}>
                Add event // TODO
            </Button>
        </GridToolbarContainer>
    );
}

export default function EventsPage() {
    const [pagination, setPagination] = useState({limit: 5, page: 1});
    const {data: events, isValidating} = useSWR(['events', pagination], ListEventsFetcher)

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body1" gutterBottom>
                    Available events
                </Typography>
            </Box>

            <Box sx={{height: 500, width: '100%'}}>
                <DataGrid
                    rows={events ?? []}
                    rowCount={events ? 100 : 0}
                    columns={ListEventsGridColumnsDef}
                    slots={{toolbar: CustomToolbar}}
                    loading={isValidating}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: pagination.limit,
                            },
                        },
                    }}
                    paginationMode="server"
                    checkboxSelection
                    disableRowSelectionOnClick
                    onPaginationModelChange={e => setPagination({...pagination, page: e.page + 1})}
                />
            </Box>
        </>
    );
}
