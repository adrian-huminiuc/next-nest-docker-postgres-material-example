import {GridColDef} from "@mui/x-data-grid";

export const ListEventsGridColumnsDef: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 150},
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: false,
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 150,
        editable: false,
        renderCell: (params)=> (
            <>{params.value}</>
        )
    },
    {
        field: 'type',
        headerName: 'Event Type',
        width: 150,
        editable: false,
    },

    {
        field: 'description',
        headerName: 'Description',
        width: 500,
        editable: false,
    },
]