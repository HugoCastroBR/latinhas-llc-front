'use client'

import "./styles.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import useStore from "../../hooks/useStore";
import { SetEditDialogOpen, SetLatinhas, SetMaxProd } from "../../store/actions";
import { getLatinhas, removeLatinha } from "../../api";





const LatinhasTable = () => {

  const { states, dispatch } = useStore();


  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [initialRows, setInitialRows] = React.useState(states.Latinhas.latinhas)
  const [rows, setRows] = React.useState(initialRows);
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [totalPages, setTotalPages] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);


  const [EditingDemandId, setEditingDemandId] = React.useState<number>(0)

  React.useEffect(() => {
    setEditingDemandId(states.Demandas.editingDemanda.id)
  }, [states.Demandas.editingDemanda])

  const getLatinhasFromApi = async () => {
    try {
      if(page == 0){
        const latinhasData = await getLatinhas(EditingDemandId,1, itemsPerPage);
        setRows(latinhasData?.latinhas || [])
        dispatch(SetLatinhas(latinhasData?.latinhas || []))
        setTotalPages(latinhasData?.totalPages || 1)
        setTotalItems(latinhasData?.total || 0)
      }else{
        const latinhasData = await getLatinhas(EditingDemandId,page, itemsPerPage);
        setRows(latinhasData?.latinhas || [])
        dispatch(SetLatinhas(latinhasData?.latinhas || []))
        setTotalPages(latinhasData?.totalPages || 1)
        setTotalItems(latinhasData?.total || 0)
      }
    
    } catch (error) {
      console.error("Erro ao buscar latinhas",error)
    }
  }

  React.useEffect(() => {
    getLatinhasFromApi()
  }, [EditingDemandId])

  React.useEffect(() => {
    getLatinhasFromApi()
  }, [page, itemsPerPage])

  React.useEffect(() => {
    getLatinhasFromApi()
  }, [])

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const removeLatinhaFromApi = async(
    demandId:number,
    id:number,
  ) => {
    await removeLatinha(demandId,id);
    await getLatinhasFromApi()
  }

  const handleRemoveClick = (id: GridRowId) => () => {
    removeLatinhaFromApi(states.Demandas.editingDemanda.id,Number(id))
  };



  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  

  React.useEffect(() => {
    getLatinhasFromApi()
  }, [states.Latinhas.newDialogOpen])

  const columns: GridColDef[] = [

    {
      field: 'Sku',
      headerName: 'SKU',
      flex: 1,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'descricao',
      headerName: 'DESCRIÇÃO',
      flex: 1,
      type: 'string',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'TotalPlan',
      headerName: 'TOTAL PLAN.(TONS)',
      flex: 1,
      type: 'number',
      headerClassName: 'demandasHeader',
      align: 'center',
      headerAlign: 'center',
      sortable: false,
    },
    {
      field: 'remove',
      type: 'actions',
      headerName: 'Remover',
      width: 100,
      align: 'center',
      headerClassName: 'demandasHeader',
      cellClassName: 'actions',
      sortable: false,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon
              color="warning"
            />}
            label="Edit"
            className="textPrimary"
            onClick={handleRemoveClick(id)}
            color="inherit"
          />,
        ];
      },
    },
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
        editMode="row"
        onPaginationModelChange={
          (params) => {
            setPage(params.page)
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
            if (params.value === 'PLANEJAMENTO') {
              return 'demandaStatus1'
            }
            if (params.value === 'EM ANDAMENTO') {
              return 'demandaStatus2'
            }
            if (params.value === 'CONCLUÍDO') {
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

export default LatinhasTable;