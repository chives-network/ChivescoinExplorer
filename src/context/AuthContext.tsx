// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'

import { getCurrentWalletAddress, getCurrentWallet } from 'src/functions/ChivescoinWallets'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  currentWallet: null,
  currentAddress: '',
  setAuthContextCurrentAddress: () => Promise.resolve(),
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  
  const [currentWallet, SetCurrentWallet] = useState<null>(defaultProvider.currentWallet)
  const [currentAddress, SetCurrentAddress] = useState<string>(defaultProvider.currentAddress)
  

  // ** Hooks
  const router = useRouter()

  /*
  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const chivesWalletsList: any = window.localStorage.getItem(authConfig.chivesWallets)!

      if (chivesWalletsList && chivesWalletsList[0] && chivesWalletsList[0].jwk) {
        //Have Exists Wallet
      }
      else {
        SetCurrentWallet(null)
        SetCurrentAddress("")
        window.localStorage.removeItem(authConfig.chivesWallets)
        window.localStorage.removeItem(authConfig.chivesCurrentWallet)
        router.replace('/login')
      }      
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  */

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const currentAddress: string = getCurrentWalletAddress();
      console.log("currentAddress", currentAddress)
      if(currentAddress != undefined && currentAddress != null) {
        SetCurrentWallet(getCurrentWallet())
        SetCurrentAddress(currentAddress)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        params.rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
          : null
        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.userData })
        params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    
    //setUser(null)

    //window.localStorage.removeItem('userData')
    //window.localStorage.removeItem(authConfig.storageTokenKeyName)
    //router.push('/login')
  }

  useEffect(() => {
    const user = {id: 1, role: 'admin', fullName: 'John Doe', username: 'johndoe', email: 'chivescoin@gmail.com'}
    setUser(user as UserDataType)
  }, [])

  const handleCurrentAddress = (Address: string) => {
    SetCurrentAddress(Address)
    SetCurrentWallet(getCurrentWallet())
  }

  const values = {
    user,
    loading,
    currentWallet,
    currentAddress,
    setAuthContextCurrentAddress: handleCurrentAddress,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
