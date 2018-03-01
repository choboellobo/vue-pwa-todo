<template lang="pug">
  div
    Navbar
    //- If there is more than 0 wallets
    .container(v-if="wallets.length > 0")
       .row
         .col.s12
            ul.collection
              li.collection-item.avatar(v-for="wallet in wallets" )
                span.title {{wallet.name}}
                p Completados #[strong {{ wallet.tasks | taskDone }}] de #[strong {{ Object.keys(wallet.tasks).length }}]
                a.secondary-content
                  i.material-icons more_vert
    Fab
      button.btn-floating.btn-large.indigo.darken-1(@click="modalAddWallet.open()")
        i.material-icons add

    //out of viewport
    Modal(@mounted="modalAddWallet = $event")
    Loading(v-if="loading")
    EmptyContent(icon="playlist_add" text="Añade una nueva lista" v-if="wallets.length == 0 && !loading")
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  filters: {
    taskDone(tasks) {
      let num = 0;
      for(let index in tasks) {
        if( tasks[index].completed ) num++
      }
      return num
    }
  },
  computed: {
    ...mapGetters(['getUserData']),
    canAddWallet() {
      return this.walletModel.name.length == 0
    }
  },
  data() {
    return {
      loading: true,
      db: null,
      wallets: [],
      modalAddWallet: null,
      walletModel: {name: ''}
    }
  },
  mounted(){
    let user = this.getUserData.uid
    this.db = this.$firebase.database();
    this.db.ref('/users/'+ user +'/wallets')
      .on('value', snapshot => {
        this.wallets = []
        let wallets = snapshot.val()
        if(wallets) this.getUserWallets(wallets)
        else this.loading = false
      })
  },
  methods: {
    goToWallet(wallet) {
      this.$router.push({name: 'Wallet', params: {key: wallet.key}})
    },
    shareWallet(key) {
      let url = window.location.origin + '/#/mix/' + key
      if (navigator.share) {
          navigator.share({
            title: 'Compartir mi lista',
            text: 'Quiero compartir mi lista contigo, pincha en el enlace para añadirte a ella.',
            url: url
        })
      }
    },
    removeWallet(key) {
      let confirm = window.confirm('Desea borrar')
      if(confirm) {
        this.db.ref('/wallets/'+ key).remove()
        this.db.ref('/users/' + this.getUserData.uid + '/wallets').transaction(data => {
          return data.filter(elem => elem != key)
        })
      }
    },
    getUserWallets(walletArray) {
      walletArray.forEach(wallet => {
        this.db.ref('/wallets/'+ wallet).once('value', snapshot => {
            this.wallets.push(Object.assign({key: wallet}, snapshot.val()))
            this.loading = false
        });
      })
    },
    createWallet(){
      let promiseWallet = this.db.ref('wallets').push({
        name: this.walletModel.name,
        created: new Date().toString()
      })
      let promiseUserWallet = promiseWallet.then(res => {
        this.walletModel.name = ''
        this.db.ref('/users/' + this.getUserData.uid +'/wallets').transaction(data => {
          Array.isArray(data) ? data.push(res.key) :  data = [res.key]
          return data
        })
        Promise.all([promiseWallet, promiseUserWallet]).then(resolve => this.modalAddWallet.close() )
      })
    }
  }
}
</script>

<style src="./main.scss" lang="scss" scoped></style>
