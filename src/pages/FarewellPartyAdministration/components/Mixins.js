import {
  mapState,
  mapActions,
  mapMutations
} from 'vuex'
export default {
  computed: {
    ...mapState({
      FarewellPartyAdministration: 'FarewellPartyAdministration'
    })
  },
  methods: {
    ...mapMutations({
      SETOPTIONS: 'FarewellPartyAdministration/SETOPTIONS'
    }),
    ...mapActions({
      findAllFHs: 'FarewellPartyAdministration/findAllFHs',
      getFindAllFHs: 'FarewellPartyAdministration/getFindAllFHs'
    })

  }

}
