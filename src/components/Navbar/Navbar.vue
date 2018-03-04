<template lang="pug">
  div
    .navbar-fixed
      nav.indigo.darken-1
        .nav-wrapper
          ul.left(v-if="backButton")
            li
              a(@click="goBack")
                i.material-icons arrow_back 
          span.title {{title}}
          ul.right
            li
              a(@click="logout")
                i.material-icons exit_to_app

</template>

<script>
export default {
  props: {
    title: String,
    backButton: {type: Boolean, default: false}
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    logout() {
      let cm = window.confirm('Desea salir de la aplicación')
      if(cm) this.$firebase.auth().signOut()

    }
  }
}
</script>

<style src="./Navbar.scss" lang="scss" scoped></style>
