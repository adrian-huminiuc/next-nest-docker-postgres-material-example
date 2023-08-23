import {GridColDef} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {MouseEvent} from "react";
import {EventSubscriptionDeleteFetcher} from "@/lib/event-subscriptions/delete/event-subscription-delete.fetcher";
import {GridApiCommunity} from "@mui/x-data-grid/internals";

const onButtonClick = async (e: MouseEvent, row: {id: string}, api: GridApiCommunity) => {
    e.stopPropagation();
    await EventSubscriptionDeleteFetcher(['delete', row.id]).then(
        ()=> api.updateRows([{id: row.id, _action: 'delete'}])
        // reload whole grid when row count is 0
    )
};

export const ListEventSubscriptionsGridColumnsDef: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 150},
    {
        field: 'eventName',
        headerName: 'Event name',
        width: 150,
        editable: false,
    },
    {
        field: 'eventDate',
        headerName: 'Event Date',
        width: 150,
        editable: false,
    },
    {
        field: 'createdAt',
        headerName: 'Subscribed at',
        width: 150,
        editable: false,
    },
    {
        field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
            return (
                <Button
                    onClick={(e) => onButtonClick(e, params.row, params.api)}
                >
                    Delete
                </Button>
            );
        }
    }
]