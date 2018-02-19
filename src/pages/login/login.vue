<template lang="pug">
  div.main.flex.vertical-center.horizontal-center
    button.waves-effect.waves-light.btn.red.darken-3
      span ACCEDE CON GOOGLE
    Loading
</template>

<script>
import Loading from '../../components/Loading/Loading.vue'
export default {
  components: {Loading}
}
</script>

<style src="./login.scss" lang="scss" scoped></style>
