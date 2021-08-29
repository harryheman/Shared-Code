import { Home } from 'pages/Home'
import { Gallery } from 'pages/Gallery'
import { GalleryProfile } from 'pages/GalleryProfile'
import { Favourite } from 'pages/Favourite'
import { FavouriteProfile } from 'pages/FavouriteProfile'
import { NoMatch } from 'pages/NoMatch'

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/gallery',
    exact: true,
    component: Gallery
  },
  {
    path: '/gallery/:id',
    component: GalleryProfile
  },
  {
    path: '/favourite',
    exact: true,
    component: Favourite
  },
  {
    path: '/favourite/:id',
    component: FavouriteProfile
  },
  {
    path: '*',
    component: NoMatch
  }
]
