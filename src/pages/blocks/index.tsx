// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import Box from '@mui/material/Box'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/blocks'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { formatHash} from 'src/configs/functions';

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Config
import authConfig from 'src/configs/auth'

interface BlockCellType {
  row: any
}

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 550,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  },
  '&[target="_blank"]': {
  }
}))

const BlockList = () => {
  // ** Hook
  const { t } = useTranslation()

  // ** State
  const [isLoading, setIsLoading] = useState(false);

  const paginationModelDefaultValue = { page: 0, pageSize: 12 }
  const [paginationModel, setPaginationModel] = useState(paginationModelDefaultValue)  
  
  console.log("paginationModel", paginationModel)
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.blocks)

  useEffect(() => {
    dispatch(
      fetchData({
        pageId: paginationModel.page,
        pageSize: paginationModel.pageSize
      })
    )
  }, [dispatch, paginationModel])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 80,
      field: 'Height',
      headerName: `${t(`Height`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: BlockCellType) => {

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkStyled href={authConfig.backEndApi + `/blockview.php?header_hash=` + row.header_hash + `&height=` + row.height} target="_blank">{row.height}</LinkStyled>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 80,
      field: 'Hash',
      headerName: `${t(`Hash`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: BlockCellType) => {

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkStyled href={authConfig.backEndApi + `/blockview.php?header_hash=` + row.header_hash + `&height=` + row.height} target="_blank">{formatHash(row.header_hash, 12)}</LinkStyled>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 110,
      field: 'Miner',
      headerName: `${t(`Miner`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: BlockCellType) => {
        return (
          <Typography noWrap variant='body2'>
            <LinkStyled href={authConfig.backEndApi + `/addressview.php?address=` + row.farmer_address + `&height=` + row.height + ``} target="_blank">{formatHash(row.farmer_address, 12)}</LinkStyled>
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'MinedTime',
      headerName: `${t(`MinedTime`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: BlockCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.timestamp}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'POS',
      headerName: `${t(`POS`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: BlockCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.proof_of_space}
          </Typography>
        )
      }
    }
  ]

  return (
    <Fragment>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={`${t(`Blocks`)}`} />
              <Divider />
              <DataGrid
                autoHeight
                rows={store.data}
                rowCount={store.total as number}
                columns={columns}
                sortingMode='server'
                paginationMode='server'
                filterMode="server"
                loading={isLoading}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 12, 15, 20, 30, 50, 100]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                disableColumnMenu={true}
              />
            </Card>
          </Grid>
        </Grid>
      </Fragment>
  )
}

export default BlockList
