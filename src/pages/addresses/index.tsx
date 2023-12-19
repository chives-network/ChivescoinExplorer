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

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData } from 'src/store/apps/addresses'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { formatHash } from 'src/configs/functions'

// ** Third Party Import

import { useTranslation } from 'react-i18next'

// ** Config
import authConfig from 'src/configs/auth'

interface AddressCellType {
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
  }
}))



const AddressesList = () => {
  // ** Hook
  const { t } = useTranslation()
  
  // ** State
  const [isLoading, setIsLoading] = useState(false);

  const paginationModelDefaultValue = { page: 0, pageSize: 15 }
  const [paginationModel, setPaginationModel] = useState(paginationModelDefaultValue)  
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.addresses)

  useEffect(() => {
    console.log("paginationModel", paginationModel)
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
      flex: 1,
      minWidth: 200,
      field: 'Address',
      headerName: `${t(`Address`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        
        return (
          <Typography noWrap variant='body2'>
            <LinkStyled href={authConfig.backEndApi + `/addressview.php?address=` + row.id} target="_blank">{formatHash(row.id, 20)}</LinkStyled>
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'Balance',
      headerName: `${t(`Balance`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.value}
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
              <CardHeader title={`${t('Addresses')}`} />
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
                pageSizeOptions={[10, 15, 20, 30, 50, 100]}
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


export default AddressesList
