<script>
import { mapActions } from 'vuex'

export default {
  name: 'MmAuth',
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
