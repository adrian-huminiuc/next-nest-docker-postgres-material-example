'use client'
import * as React from "react";
import {useEffect, useState} from "react";
import useSWR from "swr";
import {ListEventSubscriptionsFetcher} from "@/lib/event-subscriptions/list/list-event-subscriptions.fetcher";
import Box from "@mui/material/Box";
import {DataGrid} from "@mui/x-data-grid";
import {
    ListEventSubscriptionsGridColumnsDef
} from "@/lib/event-subscriptions/list/list-event-subscriptions.grid-columns-def";

interface EventSubscriptionTableProps {
    pastDates: boolean;
}

export default function EventSubscriptionTable(props: EventSubscriptionTableProps) {
    const { pastDates } = props;
    const [pagination, setPagination] = useState({limit: 5, page: 1});
    const [filters, setFilters] = useState({pastDates});
    const {data: events, isValidating} = useSWR(['events', pagination, filters], ListEventSubscriptionsFetcher);

    useEffect(() => {
        setFilters({pastDates: props.pastDates});
    }, [props])

    return (
        <Box sx={{height: 500, width: '100%'}}>
            <DataGrid
                rows={events ?? []}
                rowCount={events ? 100 : 0}
                columns={ListEventSubscriptionsGridColumnsDef}
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
    );
}