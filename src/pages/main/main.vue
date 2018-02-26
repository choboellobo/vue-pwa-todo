<template lang="pug">
  div
    Navbar
    .container
       .row
         .col.s12
            ul.collection
              li.collection-item.avatar
                span.title Lista de la compra
                P completados #[strong 3] de #[strong 14]
                a.secondary-content
                  i.material-icons more_vert
    Fab
      a.btn-floating.btn-large.indigo.darken-1
        i.material-icons add
    //out of viewport
    //Loading
    EmptyContent
</template>

<script>
export default {
}
</script>

<style src="./main.scss" lang="scss" scoped></style>
