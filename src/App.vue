<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      userUid: null
    }
  },
  mounted() {

    this.$firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.userUid = user.uid
        this.setUserData(user);
      } else {
        this.setUserData(null)
        this.$router.push({name: 'Login'})
      }
    })
  },
  methods: {
    ...mapMutations(['setUserData'])
  }
}
</script>

<style lang="scss">
  @import url('../node_modules/materialize-css/dist/css/materialize.css');
  @import url('../node_modules/animate.css/animate.css');
  @import 'helpers';
  //global styles
  .collection{
    border:0;
  }
  </style>
