import {useEffect, useState} from 'react';
import { DataGrid } from '@material-ui/data-grid';

import ServerRequest from './helpers/ServerRequest';
import {useHistory} from "react-router-dom";

const COLUMNS = [
    { field: 'id', headerName: 'ID', hide: true },
    {
        field: 'name',
        headerName: 'Name',
        description: 'Volcano Name',
        sortable: false,
        width: "180"
    },
    {
        field: 'date',
        headerName: 'Date',
        description: 'Volcano explodation date',
        sortable: true,
        width: "180"
    },
    {
        field: 'elevation',
        headerName: 'Elevation',
        description: 'Volcano damage elevation',
        sortable: false,
        width: "180"
    },
    {
        field: 'location',
        headerName: 'Location',
        description: 'Volcano location',
        sortable: false,
        width: "180"
    },
    {
        field: 'country',
        headerName: 'Country',
        description: 'Volcano origin country',
        sortable: false,
        width: "180"
    },
    {
        field: 'status',
        headerName: 'Status',
        description: 'Volcano status',
        sortable: false,
        width: "180"
    },
    {
        field: 'deaths',
        headerName: 'Deaths',
        description: 'Deaths caused by the volcano',
        sortable: true,
        width: "180"
    },
    {
        field: 'coordinates',
        headerName: 'Coordinates',
        description: 'Volcano location',
        sortable: false,
        width: "180"
    },
];

const VolcanoTable = () => {
    const [volcanos, setVolcanos] = useState([]);
    const [loading, setLoading] = useState(true);
    let history = useHistory();

    useEffect(() => {
        async function refreshOnMount() {
            const response = await ServerRequest.get({
                "dataset": "significant-volcanic-eruption-database@public",
                "facet": ["year", "status", "coordinates", "month", "day"],
                "rows": 1000,
            });
            setVolcanos(response.records);
            setLoading(false);
        }

        refreshOnMount();
    }, []);

    let rows = [];

    for (let v of volcanos) {
        let date = "Unknown";
        if (v.fields.day) {
            date = v.fields.year + "-" + v.fields.month + "-" + v.fields.day;
        } else if (v.fields.month) {
            date = v.fields.year + "-" + v.fields.month;
        } else {
            date = v.fields.year;
        }

        let coordinates = v.fields.coordinates[0] + " , " + v.fields.coordinates[1];

        rows.push({
            "id": v.recordid,
            "name": v.fields.name,
            "elevation": v.fields.elevation,
            "location": v.fields.location,
            "status": v.fields.status,
            "deaths": v.fields.deaths,
            "country": v.fields.country,
            "date": date,
            "coordinates": coordinates
        });
    }

    const onClick = (params, event) => {
        let rowId = params.row.id
        history.push(`/gis/volcano/${rowId}`);
        event.defaultMuiPrevented = true;
    };

    return (
        <div className="table-container">
          <DataGrid
            loading={loading}
            onCellClick={onClick}
            rows={rows}
            columns={COLUMNS}
            pageSize={12}
            autoHeight={true}
            />
        </div>
    );
}

export default VolcanoTable;
