<template lang="pug">
    div
        .carousel.carousel-slider
            .carousel-fixed-item.center
                button.btn.waves-effect.white.black-text EMPEZAR           
            .carousel-item.indigo.lighten-2
                img
                h5 Crea tus listas 
                p Podrás crear listas que incluirán productos, recados, tareas... y compartirlas con otros usuarios, así como eliminarlas.
            .carousel-item.indigo.lighten-1
                img
                h5 Añade contenido a tus listas
                p Podrás añadir los productos, recados, tareas... de la temática de tu lista que después podrás editar y/o eliminar.
            .carousel-item.indigo.darken-1
                img
                h5 Aviso importante
                p Recuerda que tu aplicación se actualizará automáticamente sin necesidad de que hagas nada. Que la difrutes!
</template>

<style lang="scss" src="./tutorial.scss" scoped>

</style>

<script>
export default {
    mounted(){
        const elem = document.querySelector(".carousel")
        const options = {
            fullWidth: true,
            indicators: true,
           }
        let carousel = this.$materialize.Carousel.init(elem,options)

    }
  
}
</script>
