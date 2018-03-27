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
      userUid: null,
      messaging: null
    }
  },
  mounted() {
    this.messaging = this.$firebase.messaging();
    this.$firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.requestPushNotification()
        this.watchNotification();
        this.userUid = user.uid
        this.setUserData(user);
      } else {
        this.setUserData(null)
        this.$router.push({name: 'Login'})
      }
    })
  },
  methods: {
    ...mapMutations(['setUserData']),
    requestPushNotification() {
      this.messaging.requestPermission().then(()=> this.getNotificationToken())
      this.notificationTokenRefresh()
    },
    getNotificationToken() {
      this.messaging.getToken().then(currentToken => {
        console.log(this.userUid, currentToken)
        if (currentToken && this.userUid) this.$firebase.database().ref('/users/'+ this.userUid + '/pushToken').set({token: currentToken})
      }) 
    },
    notificationTokenRefresh() {
      this.messaging.onTokenRefresh(()=> {this.getNotificationToken()})
    },
    getNotificationSuscription() {
      if(navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(suscriptions => {
          let firebaseSW = suscriptions.filter(sw => sw.active.scriptURL.includes('firebase'))
          if(firebaseSW.length > 0) return firebaseSW[0].pushManager.getSubscription()
          else return Promise.resolve(null)
        })
      }
    },
    watchNotification(){
      this.messaging.onMessage(notification => {
        console.log(notification)
      })
    }
  }
}
</script>

<style lang="scss">
  @import url('../node_modules/materialize-css/dist/css/materialize.css');
  @import url('../node_modules/animate.css/animate.css');
  @import 'helpers';
  //global styles
  body{
    height: 100vh;
  }
  .collection{
    overflow: visible;
    border:0
    }
  .btn-flat[disabled]{
    background-color: transparent !important;
  }
  .primary-color{
    color: #3949ab;
  }
</style>
