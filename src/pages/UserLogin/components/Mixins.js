import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'

export default {
  computed: {
    ...mapState({
      UserLogin: 'UserLogin',
    })
  },
  methods: {
    ...mapMutations({
      SETDATA: 'UserLogin/SETDATA',
      SETOPTIONS: 'UserLogin/SETOPTIONS'
    }),
    ...mapActions({
      sendLogin: 'UserLogin/sendLogin'
    })

  }

}
