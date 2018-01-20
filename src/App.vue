<template lang="pug" src='./App.pug'></template>
<style src='./App.css'></style>

<script>
import MmAuthChecker from '@/components/MmAuthChecker/MmAuthChecker'

export default {
  name: 'App',
  components: {
    'mm-auth-checker': MmAuthChecker
  }
}
</script>
