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
import { SetDemandas, SetEdidingDemanda, SetEditDialogOpen } from "@/app/store/actions";
import { getDemandas, getOneDemanda } from "@/app/api";
import { Demanda, demandaGetProps, demandasGetAllProps } from '@/app/types/demandas'





const DemandasTable = () => {





  const { states, dispatch } = useStore();


  const [initialRows, setInitialRows] = React.useState(states.Demandas.demandas)
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({})
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const getDemandasFromApi = async () => {
    try {
      if(page == 0){
        const demandasData = await getDemandas(1, itemsPerPage);
        setRows(demandasData?.demandas || [])
        dispatch(SetDemandas(demandasData?.demandas || []))
        setTotalPages(demandasData?.totalPages || 1)
        setTotalItems(demandasData?.total || 0)
      }else{
        const demandasData = await getDemandas(page, itemsPerPage);
        setRows(demandasData?.demandas || [])
        dispatch(SetDemandas(demandasData?.demandas || []))
        setTotalPages(demandasData?.totalPages || 1)
        setTotalItems(demandasData?.total || 0)
      }
    } 
    catch (error) {
      console.error('Erro ao buscar demandas:', error);
    }
  }

  React.useEffect(() => {
    getDemandasFromApi()
  }, [])

  React.useEffect(() => {
    if(page <= 1){
      setPage(1)
      getDemandasFromApi()
    }
    getDemandasFromApi()
  }, [page, itemsPerPage])

  React.useEffect(() => {
    getDemandasFromApi()
  }, 
  [
  states.Demandas.newDialogOpen,
  states.Demandas.editDialogOpen,
  ])
  


  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const getOneDemandasFromApi = async (id: number) => {
    try {
      const demandaData = await getOneDemanda(id);
      dispatch(SetEdidingDemanda(demandaData))
      dispatch(SetEditDialogOpen(true))
    } 
    catch (error) {
      console.error('Erro ao buscar demanda:', error);
    }
  }

  const handleEditClick = (id: number) => () => {
    getOneDemandasFromApi(id)
  };


  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // const genPeriod = () => {
  //   rows.map((row) => {
  //     row.periodo = row.dataInicio + ' - ' + row.dataFim
  //   })
  // }

  // genPeriod()

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
            onClick={handleEditClick(Number(id))}
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
      minHeight: '400px',
      maxHeight: '1200px',
      width: '100%',
      backgroundColor: 'white',
      marginTop: '20px',
      borderRadius: '5px',
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        onPaginationModelChange={
          (params) => {
            console.log(params)
            setPage(params.page + 1)
            setItemsPerPage(params.pageSize)
          }
        }
        initialState={{
          pagination: { paginationModel: { 
            page: 1,
            pageSize: 10
        }},
        }}
        pageSizeOptions={[10, 25]}
        rowCount={totalItems}
        sx={{
          minHeight: '400px',
          maxHeight: '1200px',
          width: '100%',
        }}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableEval
        disableRowSelectionOnClick
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
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