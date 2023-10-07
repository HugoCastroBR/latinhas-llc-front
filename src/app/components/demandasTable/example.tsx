'use client'

import "./styles.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridCellParams,
} from '@mui/x-data-grid';


const initialRows: GridRowsProp = [
  {
    id: 1,
    periodo: "2021-09-01",
    SKUs: 1,
    "Total Plan.(TONS)": 100,
    "Total Prod.(TONS)": 100,
    "status": "PLANEJAMENTO",
  },
];


export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: 'editar',
      type: 'actions',
      headerName: 'EDITAR',
      width: 100,
      align: 'center',
      headerClassName: 'demandasHeader',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: 'periodo',
      headerName: 'PERÍODO',
      width: 150,
      type: 'string',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'SKUs',
      headerName: 'SKUs',
      width: 150,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Total Plan.(TONS)',
      headerName: 'TOTAL PLAN.(TONS)',
      width: 150,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'Total Prod.(TONS)',
      headerName: 'TOTAL PROD.(TONS)',
      width: 150,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 150,
      type : 'singleSelect',
      valueOptions: ['PLANEJAMENTO', 'EM ANDAMENTO', 'CONCLUÍDO'],
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',

    }
  ];

  return (
    <Box sx={{
      height: 400,
      width: '100%',
      backgroundColor: 'white',
      marginTop: '20px',
      borderRadius: '5px',
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{

        }}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        getCellClassName={(params: GridCellParams<any, any, number>) => {
          if (params.field === 'status') {
            if(params.value === 'PLANEJAMENTO'){
              return 'demandaStatus1'
            }
            if(params.value === 'EM ANDAMENTO'){
              return 'demandaStatus2'
            }
            if(params.value === 'CONCLUÍDO'){
              return 'demandaStatus3'
            }
            return ''
          }
          return '';
        }}
      />
    </Box>
  );
}