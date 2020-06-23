export default {
  SETOPTIONS(state, res) {
    Object.keys(res).forEach(item => (state[item] = res[item]))
  }
}
