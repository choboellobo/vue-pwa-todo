<template lang="pug">
  div.main.flex.vertical-center.horizontal-center
    button.waves-effect.waves-light.btn.red.darken-3(@click="signIn" v-if="!loading")
      span ACCEDE CON GOOGLE
    // Out of wiewport
    Loading(v-if="loading")
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  computed: mapGetters(['getUserData']),
  data() {
    return {
      loading: false
    }
  },
  methods: {
        signIn() {
          this.loading = true;
          let provider = new this.$firebase.auth.GoogleAuthProvider();
          this.$firebase.auth().signInWithPopup(provider)
          .then(res => {
            console.log(res)
            this.$router.push({name: 'Main'})
            this.loading = false
          })
          .catch(error => this.loading = false)
        }
    }

}
</script>

<style src="./login.scss" lang="scss" scoped></style>
