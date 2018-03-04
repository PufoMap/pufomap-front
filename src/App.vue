<template lang="pug" src='./App.pug'></template>
<style src='./App.css'></style>

<script>
import MmAuthChecker from '@/components/MmAuthChecker/MmAuthChecker'

export default {
  name: 'App',
  metaInfo: {
    title: 'MagufoMap',
    titleTemplate: (titleChunk) => titleChunk ? `${titleChunk} | Magufo Map` : 'MagufoMap',
    meta: [
      { vmid: 'description', name: 'description', content: 'El mapa de negocios y actividades que promuevan o comercien con fenómenos paranormales o pseudocientíficos.' }
    ]
  },
  components: {
    'mm-auth-checker': MmAuthChecker
  }
}
</script>
