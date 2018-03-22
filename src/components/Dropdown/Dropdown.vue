<template lang="pug">
  div.inline
    a.secondary-content.dropdown-trigger(:data-target='key' ref="dropdownTrigger")
        i.material-icons {{icon}}
    ul.dropdown-content(:id="key" )
        slot
    
</template>

<script>
export default {
    props:{
        icon:{
            type:String,
            default:"more_vert"
        }
    },
  data() {
      return {
          key: new Date().getTime()
      }
  },
  mounted() {
        let elem = this.$refs.dropdownTrigger
        this.$materialize.Dropdown.init(elem, {});
  }
}
</script>
<style src="./Dropdown.scss" lang="scss" scoped>
    
</style>
