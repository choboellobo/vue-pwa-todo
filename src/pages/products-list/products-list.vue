<template lang="pug">
  div
    Navbar(title="soy un título" :backButton="true")
    .container
      .row
        .col.s12
          ul.collection
            li.collection-item
              label
                input(type="checkbox")
                span.completed Pan
              a.secondary-content #[i.material-icons more_vert]
</template>
<script>
export default {
  
}
</script>
<style src="./products-list.scss" lang="scss" scoped></style>

