const state = () => ({
  list: ['a', 'b']
})

const mutation = {
  add(stats, text) {
    state.list.push(text)
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
