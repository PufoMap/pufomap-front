<script>
import { mapActions } from 'vuex'

export default {
  name: 'PmAuth',
  template: '<div></div>',
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
