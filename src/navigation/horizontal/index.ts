// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'


const navigation = (): HorizontalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'mdi:home-outline',
      badgeContent: 'new',
      badgeColor: 'error',
      path: '/overview'
    },
    {
      title: 'Blocks',
      icon: 'clarity:blocks-group-line',
      path: '/blocks'
    },
    {
      title: 'Addresses',
      icon: 'clarity:wallet-solid',
      path: '/addresses'
    },
    {
      title: 'Nodes',
      icon: 'fa6-solid:share-nodes',
      path: '/nodes'
    },
    {
      title: 'Memory Pool',
      icon: 'mdi:pool',
      path: '/mempool'
    }
  ]
}

export default navigation
