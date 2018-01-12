import Overview from '../Components/Overview.vue'
import Detail from '../Components/Detail.vue'

export default [
  {
    path: '/',
    component: Overview,
    name: 'home'
  }, {
    path: '/movie/:movieId',
    component: Detail,
    name: 'movie',
    props: true
  }, {
    path: '*',
    redirect: {
      name: 'home'
    }
  }
]
