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
import useStore from "@/app/hooks/useStore";
import { SetEditDialogOpen } from "@/app/store/actions";


const initialRows: GridRowsProp = [
  {
    id: 1,
    dataInicio: "2021-09-01",
    dataFim: "2021-09-02",
    SKUs: 1,
    "totalPlan": 100,
    "totalProd": 100,
    "status": "PLANEJAMENTO",
  },
];


const DemandasTable = () => {

  const { states, dispatch } = useStore();

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    dispatch(SetEditDialogOpen(true))
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const genPeriod = () => {
    rows.map((row) => {
      row.periodo = row.dataInicio + ' - ' + row.dataFim
    })
  }

  genPeriod()

  const columns: GridColDef[] = [
    {
      field: 'editar',
      type: 'actions',
      headerName: 'EDITAR',
      width: 100,
      align: 'center',
      headerClassName: 'demandasHeader',
      cellClassName: 'actions',
      sortable: false,
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
      flex: 1,
      type: 'string',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'SKUs',
      headerName: 'SKUs',
      flex: 1,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'totalPlan',
      headerName: 'TOTAL PLAN.(TONS)',
      flex: 1,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'totalProd',
      headerName: 'TOTAL PROD.(TONS)',
      flex: 1,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      type : 'singleSelect',
      valueOptions: ['PLANEJAMENTO', 'EM ANDAMENTO', 'CONCLUÍDO'],
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
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
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableEval
        disableRowSelectionOnClick
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

export default DemandasTable;