import Cookie from 'js-cookie'

export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    menu: []
  },
  mutations: {
    setCode (state, val) {
      state.code = val
      Cookie.set('code', JSON.stringify(val))
      console.log(val, 'vuex')
    },
    setMenu (state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
      console.log(val, 'vuex')
    },
    clearMenu (state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu (state, router) {
      const menu = JSON.parse(Cookie.get('menu'))
      if (!menu) {
        return
      }
      state.menu = menu
      const currentMenu = [
        {
          path: '/main',
          component: () => import('../views/Main'),
          children: []
        }
      ]
      menu.forEach(item => {
        // if (item.children) {
        //   console.log(item.children)
        //   item.children = item.children.map(item => {
        //     item.component = () => import('../views/' + item.url)
        //     return item
        //   })
        //   currentMenu[0].children.push(...item.children)
        // } else {
        item.component = () => import('../views/' + item.url)
        currentMenu[0].children.push(item)
        // }
      })
      console.log(currentMenu, 'cur')
      router.addRoutes(currentMenu)
    },
    selectMenu (state, val) {
      val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
      console.log(val, 'vuex')
    },
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {},
  modules: {}
}
