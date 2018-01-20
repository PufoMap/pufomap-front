<script>
import { mapActions } from 'vuex'

export default {
  name: 'MmAuthChecker',
  template: '  ',
  methods: {
    ...mapActions({
      auth: 'auth/auth'
    })
  },
  mounted () {
    this.auth()
  }
}
</script>
