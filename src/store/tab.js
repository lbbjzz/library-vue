export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    menu: []
  },
  mutations: {
    selectMenu (state, val) {
      val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
    },
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    }
  },

  actions: {},
  modules: {}
}
