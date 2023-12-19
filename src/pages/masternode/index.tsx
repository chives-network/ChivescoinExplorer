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
import { fetchData } from 'src/store/apps/masternode'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import { formatHash } from 'src/configs/functions'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

import AnalyticsMasterNodeCard from 'src/views/dashboards/analytics/AnalyticsMasterNodeCard'

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



const MasternodeList = () => {
  // ** Hook
  const { t } = useTranslation()
  
  // ** State
  const [isLoading, setIsLoading] = useState(false);

  const paginationModelDefaultValue = { page: 0, pageSize: 15 }
  const [paginationModel, setPaginationModel] = useState(paginationModelDefaultValue)  
  
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.masternode)

  useEffect(() => {
    console.log("paginationModel", paginationModel)
    dispatch(
      fetchData({
        pageId: paginationModel.page,
        pageSize: paginationModel.pageSize
      })
    )
    console.log("store.masternode", store.masternode)
  }, [dispatch, paginationModel])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  
  const columns: GridColDef[] = [
    {
      flex: 0.3,
      minWidth: 200,
      field: 'launcher_id',
      headerName: `${t(`Launcher Id`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
            <Typography noWrap variant='body2'>
              <LinkStyled href={authConfig.backEndApi + `/coinnameview.php?goback=block&coinname=` + row.id} target="_blank">{formatHash(row.id, 12)}</LinkStyled>
            </Typography>
          )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'Height',
      headerName: `${t(`Height`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.Height}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'StakingAmount',
      headerName: `${t(`StakingAmount`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.StakingAmount}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'RewardAmount',
      headerName: `${t(`RewardAmount`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.RewardAmount}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'NodeOnline',
      headerName: `${t(`NodeOnline`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.NodeOnline}
          </Typography>
        )
      }
    },
    {
      flex: 0.18,
      minWidth: 110,
      field: 'RewardDate',
      headerName: `${t(`RewardDate`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.RewardDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'ReceivedAddress',
      headerName: `${t(`ReceivedAddress`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            <LinkStyled href={authConfig.backEndApi + `/addressview.php?address=` + row.ReceivedAddress} target="_blank">{formatHash(row.ReceivedAddress, 12)}</LinkStyled>
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'StakingAddress',
      headerName: `${t(`StakingAddress`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: AddressCellType) => {
        return (
          <Typography noWrap variant='body2'>
            <LinkStyled href={authConfig.backEndApi + `/addressview.php?address=` + row.StakingAddress} target="_blank">{formatHash(row.StakingAddress, 12)}</LinkStyled>
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
              { store.masternode && store.masternode.TotalCoin ?
              <AnalyticsMasterNodeCard data={store.masternode}/>
              :
              null
              }
              <CardHeader title={`${t('Masternode Reward List')}`} />
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


export default MasternodeList
