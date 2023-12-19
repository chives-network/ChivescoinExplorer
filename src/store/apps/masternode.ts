// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import authConfig from 'src/configs/auth'

interface DataParams {
  pageId: number
  pageSize: number
}

// ** Fetch Data
export const fetchData = createAsyncThunk('appMasternode/fetchData', async (params: DataParams) => {
  const response = await axios.get(authConfig.backEndApi + '/masternode_data.php?page='+ `${params.pageId}` + '&pagesize='+params.pageSize)
  
  return response.data
})

export const appMasternodeSlice = createSlice({
  name: 'appMasternode',
  initialState: {
    data: [],
    total: 1,
    params: {},
    masternode: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
      state.params = action.payload.params
      state.masternode = action.payload.masternode
    })
  }
})

export default appMasternodeSlice.reducer
