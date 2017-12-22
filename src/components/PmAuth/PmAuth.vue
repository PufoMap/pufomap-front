<script>
import { mapActions } from 'vuex'

export default {
  name: 'PmAuth',
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
