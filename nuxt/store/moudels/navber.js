const state = () => ({
  app: ['a', 'c']
})

const mutation = {
  add(stats, text) {
    state.app.push(text)
  }
}

const actions = {
  add: ({ commit }, text) => {
    commit('add', text)
  }
}

export default {
  namepace: true,
  state,
  mutation,
  actions
}
