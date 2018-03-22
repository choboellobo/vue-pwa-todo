<template lang="pug">
  div.main.flex.vertical-center.horizontal-center
    button.waves-effect.waves-light.btn.red.darken-3(@click="signIn" v-if="!loading")
      span ACCEDE CON GOOGLE
    // Out of wiewport
    Loading(v-if="loading")
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  computed: mapGetters(['getUserData']),
  data() {
    return {
      loading: false
    }
  },
  methods: {
        ...mapMutations(['setUserData']),
        signIn() {
          this.loading = true;
          let provider = new this.$firebase.auth.GoogleAuthProvider();
          this.$firebase.auth().signInWithPopup(provider)
          .then(user => {
            this.setUserData(user);
            this.$router.push({name: 'Main'})
            this.loading = false
          })
          .catch(error => this.loading = false)
        }
    }

}
</script>

<style src="./login.scss" lang="scss" scoped></style>
