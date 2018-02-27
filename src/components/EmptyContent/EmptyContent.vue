<template lang="pug">
  div
    .main.flex.vertical-center.horizontal-center.flex-column
        i.material-icons {{icon}}
        span {{text}}
</template>
<script>
export default {
  props: ['icon', 'text']
}
</script>
<style src="./EmptyContent.scss" lang="scss" scoped>

</style>

