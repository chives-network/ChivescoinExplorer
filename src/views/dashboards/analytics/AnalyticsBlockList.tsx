
// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { formatHash } from 'src/configs/functions';

// ** Third Party Import
import { useTranslation } from 'react-i18next'

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
  }
}))


export type propsType = {
  data: any[]
}

const AnalyticsBlockList = (props: propsType) => {
  // ** Hook
  const { t } = useTranslation()
  
  // ** Props
  const { data } = props

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
            <LinkStyled href={`/blocks/view/${row.height}`}>{row.height}</LinkStyled>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 80,
      field: 'Hash',
      headerName: `${t(`Hash`)}`,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: BlockCellType) => {

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LinkStyled href={`/blocks/view/${row.height}`}>{row.header_hash}</LinkStyled>
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
            <LinkStyled href={`/addresses/all/${row.farmer_address}`}>{formatHash(row.farmer_address, 10)}</LinkStyled>
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
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
    }
  ]

  return (
    <Card>
      <DataGrid autoHeight hideFooter rows={data} columns={columns} disableRowSelectionOnClick pagination={undefined} />
    </Card>
  )
}


export default AnalyticsBlockList
