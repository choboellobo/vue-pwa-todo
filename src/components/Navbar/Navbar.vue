<template lang="pug">
  div
    .navbar-fixed
      nav.indigo.darken-1
        .nav-wrapper
          span.title Lista de la compra
          ul.right
            li
              a(@click="logout")
                i.material-icons exit_to_app

</template>

<script>
export default {
  methods: {
    logout() {
      let cm = window.confirm('Desea salir de la aplicación')
      if(cm) this.$firebase.auth().signOut()

    }
  }
}
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
