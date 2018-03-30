<template lang="pug">
  div.tap-target(:data-target="target")
    .tap-target-content
        h5 {{ title }}
        p {{ content }}
        
</template>

 scoped lang="scss">
</style>

<script>
export default {
    props:["title","content","target"],
    mounted(){
        const elem = document.querySelector(".tap-target");
        let fd = this.$materialize.FeatureDiscovery.init(elem)
            fd.open()
    }
}
</script>

<style src="./FeatureDiscovery.scss" lang="scss" scoped>

</style>