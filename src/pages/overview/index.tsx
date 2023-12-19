// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import AnalyticsBlockList from 'src/views/dashboards/analytics/AnalyticsBlockList'
import AnalyticsTrophy from 'src/views/dashboards/analytics/AnalyticsTrophy'
import AnalyticsLine from 'src/views/dashboards/analytics/AnalyticsLine'
import AnalyticsTransactionsCard from 'src/views/dashboards/analytics/AnalyticsTransactionsCard'

import axios from 'axios'
import authConfig from 'src/configs/auth'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

import { setChivesReferee } from 'src/functions/ChivescoinWallets'

interface ChainInfoType {
  network: string
  version: number
  release: number
  height: number
  current: string
  blocks: number
  peers: number
  time: number
  miningtime: number
  weave_size: number
  denomination: number
  diff: string
}

const AnalyticsDashboard = () => {
  // ** Hook
  const { t } = useTranslation()

  const router = useRouter()

  const { referee } = router.query

  const [chainInfo, setChainInfo] = useState<ChainInfoType>()
  const [blockList, setBlockList] = useState<number[]>([])

  useEffect(() => {
    if(referee && referee.length == 43) {
      setChivesReferee(String(referee))
    }
  }, [referee])

  const [dataNETWORK_SPACE_X, setDataNETWORK_SPACE_X] = useState<string[]>([])
  const [dataNETWORK_SPACE_Y, setDataNETWORK_SPACE_Y] = useState<number[]>([])
  const [dataEVERY_DAY_TX_NUMBER_X, setDataEVERY_DAY_TX_NUMBER_X] = useState<string[]>([])
  const [dataEVERY_DAY_TX_NUMBER_Y, setDataEVERY_DAY_TX_NUMBER_Y] = useState<number[]>([])
  const [dataDIFFICULTY_X, setDataDIFFICULTY_X] = useState<string[]>([])
  const [dataDIFFICULTY_Y, setDataDIFFICULTY_Y] = useState<number[]>([])
  const [dataACTIVEMINERS_X, setDataACTIVEMINERS_X] = useState<string[]>([])
  const [dataACTIVEMINERS_Y, setDataACTIVEMINERS_Y] = useState<number[]>([])

  useEffect(() => {

    axios.get(authConfig.backEndApi + '/api.statistic.php', { headers: { }, params: { } })
    .then(res => {
      
      setDataNETWORK_SPACE_X(res.data.NETWORK_SPACE.dataX);
      setDataNETWORK_SPACE_Y(res.data.NETWORK_SPACE.dataY);
      setDataEVERY_DAY_TX_NUMBER_X(res.data.EVERY_DAY_TX_NUMBER.dataX);
      setDataEVERY_DAY_TX_NUMBER_Y(res.data.EVERY_DAY_TX_NUMBER.dataY);
      setDataDIFFICULTY_X(res.data.DIFFICULTY.dataX);
      setDataDIFFICULTY_Y(res.data.DIFFICULTY.dataY);
      setDataACTIVEMINERS_X(res.data.ACTIVEMINERS.dataX);
      setDataACTIVEMINERS_Y(res.data.ACTIVEMINERS.dataY);      
    })

    //Frist Time Api Fetch
    //Block List 
    axios.get(authConfig.backEndApi + '/block_data.php?page=1&pagesize=6', { headers: { }, params: { } })
      .then(res => {
        setBlockList(res.data.data)
        console.log("res.data", res.data.data)
      })
    
    //Chain Info
    axios.get(authConfig.backEndApi + '/api.node.php', { headers: { }, params: { } })
      .then(res => {
        setChainInfo(res.data);
      })

    const intervalId = setInterval(() => {
        
        //Interval Time Api Fetch
        axios.get(authConfig.backEndApi + '/api.statistic.php', { headers: { }, params: { } })
        .then(res => {
          
          setDataNETWORK_SPACE_X(res.data.NETWORK_SPACE.dataX);
          setDataNETWORK_SPACE_Y(res.data.NETWORK_SPACE.dataY);
          setDataEVERY_DAY_TX_NUMBER_X(res.data.EVERY_DAY_TX_NUMBER.dataX);
          setDataEVERY_DAY_TX_NUMBER_Y(res.data.EVERY_DAY_TX_NUMBER.dataY);
          setDataDIFFICULTY_X(res.data.DIFFICULTY.dataX);
          setDataDIFFICULTY_Y(res.data.DIFFICULTY.dataY);
          setDataACTIVEMINERS_X(res.data.ACTIVEMINERS.dataX);
          setDataACTIVEMINERS_Y(res.data.ACTIVEMINERS.dataY);      
        })

        //Frist Time Api Fetch
        //Block List 
        axios.get(authConfig.backEndApi + '/block_data.php?page=1&pagesize=6', { headers: { }, params: { } })
          .then(res => {
            setBlockList(res.data.data)
            console.log("res.data", res.data.data)
          })
        
        //Chain Info
        axios.get(authConfig.backEndApi + '/api.node.php', { headers: { }, params: { } })
          .then(res => {
            setChainInfo(res.data);
          })

    }, 120000);

    return () => clearInterval(intervalId);

  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          {chainInfo ?
            <AnalyticsTrophy data={chainInfo}/>
          :
            <Fragment></Fragment>
          }          
        </Grid>
        <Grid item xs={12} md={8}>          
          {chainInfo ?
            <AnalyticsTransactionsCard data={chainInfo}/>
          :
            <Fragment></Fragment>
          }
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          {blockList && blockList.length > 0 ?
            <AnalyticsBlockList data={blockList}/>
          :
            <Fragment></Fragment>
          }
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsLine dataX={dataNETWORK_SPACE_X} dataY={dataNETWORK_SPACE_Y} title={`${t(`Network Space`)}`} bottomText={""}/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsLine dataX={dataDIFFICULTY_X} dataY={dataDIFFICULTY_Y} title={`${t(`Difficulty`)}`} bottomText={""}/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsLine dataX={dataACTIVEMINERS_X} dataY={dataACTIVEMINERS_Y} title={`${t(`Active Miners`)}`} bottomText={""}/>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AnalyticsLine dataX={dataEVERY_DAY_TX_NUMBER_X} dataY={dataEVERY_DAY_TX_NUMBER_Y} title={`${t(`Every Day Tx Number`)}`} bottomText={""}/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AnalyticsDashboard
