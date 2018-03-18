<template lang="pug">
  div
    .main.flex.vertical-center.horizontal-center.flex-column
        i.material-icons {{icon}}
        span {{text}}
</template>
<script>
export default {
  props: {
    icon:{
      type:String,
      default:"add"
    },
    text:{
      type:String,
      default:"lista nueva"
    }
  }
}
</script>
<style src="./EmptyContent.scss" lang="scss" scoped>

</style>

