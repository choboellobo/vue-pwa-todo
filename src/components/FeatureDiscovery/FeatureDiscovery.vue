<template lang="pug">
  div.tap-target(:data-target="target")
    .tap-target-content
        h5 {{ title }} 
        p {{ content }}
        
</template>

 <style lang="scss" src="./FeatureDiscovery.scss" scoped>
 
 </style>
 
<script>
export default {
    props:["title","content","target"],
    mounted(){
        const elem = document.querySelector(".tap-target");
        const options = {
            onClose: ()=> {
                this.$emit('close-feature-discovery')
            }
        }
        let fd = this.$materialize.FeatureDiscovery.init(elem, options)
        this.$emit('mounted', fd);
    },
}
</script>

<style src="./FeatureDiscovery.scss" lang="scss" scoped>

</style>