export default {
  SETDATA(state, res) {
    state.data = res.data || {};
  },
  SETOPTIONS(state, res) {
    Object.keys(res).forEach(item => (state[item] = res[item]))
  }
}
