// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import CardHeader from '@mui/material/CardHeader'
import TableContainer from '@mui/material/TableContainer'

import { ThemeColor } from 'src/@core/layouts/types'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface FileTypeObj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

const FileTypeObj: FileTypeObj = {
  TEXT: { color: 'primary', icon: 'mdi:receipt-text-edit' },
  HTML: { color: 'success', icon: 'vscode-icons:file-type-html' },
  JSON: { color: 'primary', icon: 'mdi:code-json' },
  XML: { color: 'warning', icon: 'vscode-icons:file-type-xml' },
  ZIP: { color: 'error', icon: 'vscode-icons:file-type-zip2' },
  JPEG: { color: 'info', icon: 'iconoir:jpeg-format' },
  PNG: { color: 'primary', icon: 'iwwa:file-png' },
  DOC: { color: 'success', icon: 'vscode-icons:file-type-word2' },
  XLS: { color: 'primary', icon: 'vscode-icons:file-type-excel2' },
  PPT: { color: 'warning', icon: 'vscode-icons:file-type-powerpoint2' },
  MP4: { color: 'error', icon: 'teenyicons:mp4-outline' },
  WEBM: { color: 'info', icon: 'teenyicons:webm-outline' },
  PDF: { color: 'primary', icon: 'vscode-icons:file-type-pdf2' },
  DOCX: { color: 'success', icon: 'vscode-icons:file-type-word2' },
  XLSX: { color: 'primary', icon: 'vscode-icons:file-type-excel2' },
  PPTX: { color: 'warning', icon: 'vscode-icons:file-type-powerpoint2' },
  GIF: { color: 'error', icon: 'teenyicons:gif-outline' },
  BMP: { color: 'primary', icon: 'teenyicons:bmp-outline' },
  MP3: { color: 'success', icon: 'teenyicons:mp3-outline' },
  WAV: { color: 'primary', icon: 'teenyicons:wav-outline' }
}

interface NodeInfoType {
  ip: string
  result: any
}

const PeersInfo = () => {
  // ** Hook
  const { t } = useTranslation()
  
  const [peers, setPeers] = useState<NodeInfoType[]>()

  useEffect(() => {
    
    //Frist Time Api Fetch
    axios.get(authConfig.backEndApi + '/nodes_data.php?page=1&limit=500', { headers: { }, params: { } })
        .then(res => {
          setPeers(res.data.data);
        })

    const intervalId = setInterval(() => {
      //Interval Time Api Fetch
      axios.get(authConfig.backEndApi + '/nodes_data.php?page=1&limit=500', { headers: { }, params: { } })
        .then(res => {
          setPeers(res.data.data);
        })
    }, 120000);

    return () => clearInterval(intervalId);

  }, [])

  return (
    <Fragment>
      {peers ? 
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={`${t(`Nodes`)}`} />

              <Divider sx={{ m: '0 !important' }} />

              <TableContainer>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead >
                    <TableRow>
                      <TableCell>{`${t(`Country`)}`}</TableCell>
                      <TableCell>{`${t(`Region`)}`}</TableCell>
                      <TableCell>{`${t(`Peer Host`)}`}</TableCell>
                      <TableCell>{`${t(`Node Id`)}`}</TableCell>
                      <TableCell>{`${t(`Peak Height`)}`}</TableCell>
                      <TableCell>{`${t(`Bytes Read`)}`}</TableCell>
                      <TableCell>{`${t(`Bytes Written`)}`}</TableCell>
                      <TableCell>{`${t(`Last Message Time`)}`}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {peers.map((item: any, index: number) => (
                      <TableRow hover key={index} sx={{ '&:last-of-type td': { border: 0 } }}>
                        <TableCell>{item.country}</TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell>{item.peer_host}</TableCell>
                        <TableCell>{item.node_id}</TableCell>
                        <TableCell>{item.peak_height}</TableCell>
                        <TableCell>{item.bytes_read}</TableCell>
                        <TableCell>{item.bytes_written}</TableCell>
                        <TableCell>{item.last_message_time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
            </Card>
          </Grid>
          
        </Grid>
      :
        <Fragment></Fragment>
    }
    </Fragment>
  )
}

export default PeersInfo
