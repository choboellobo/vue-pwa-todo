<template lang="pug">
  div
    Navbar(title="Lista de la compra")
    //- If there is more than 0 wallets
    div(v-if="wallets.length > 0")
      .row
        .col.s12
          ul.collection
            li.collection-item.avatar(v-for="wallet in wallets" )
              div(@click="goToWallet(wallet)")
                i.material-icons.circle shopping_basket
                .title {{wallet.name}}
                p(v-if="wallet.tasks") Completados #[strong {{ wallet.tasks | taskDone }}] de #[strong {{ Object.keys(wallet.tasks).length }}]
              Dropdown
                li
                  a.primary-color(@click="removeWallet(wallet.key)") Eliminar
                li
                  a(@click="shareWallet(wallet.key)") Compartir
    Fab
      button.btn-floating.btn-large.indigo.darken-1(@click="modalAddWallet.open(); walletModel.name = '';$refs.inputCreateWallet.focus()")
        i.material-icons add

    //out of viewport
    Modal(@mounted="modalAddWallet = $event")
      div.input-field(slot="content")
        input.validate(id="new_list" type="text" v-model="walletModel.name" ref="inputCreateWallet")
        label(for="new_list") Ingrese un nombre
      div(slot="footer")
        a.btn-flat.waves-effect.modal-action.modal-close CANCELAR
        a.btn-flat.waves-effect(@click="createWallet" :disabled="!walletModel.name") AÑADIR
    Loading(v-if="loading")
    EmptyContent(icon="playlist_add" text="Añade una nueva lista" v-if="wallets.length == 0 && !loading")
</template>

<script>
// Observable
import { pushNotification } from '../../App';
// Vuex
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
      this.$router.push({name: 'ProductList', params: {key: wallet.key}})
    },
    shareWallet(key) {
      let url = window.location.origin + '/#/mix/' + key
      if (navigator.share) {
          navigator.share({
            title: 'Compartir mi lista',
            text: 'Quiero compartir mi lista contigo, pincha en el enlace para añadirte a ella.',
            url: url
        })
      }else alert("No soporta compartir")
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
        });
      })
      this.loading = false
    },
    createWallet(){
      let promiseWallet = this.db.ref('wallets').push({
        name: this.walletModel.name,
        created: new Date().toString()
      })
      let promiseUserWallet = promiseWallet.then(res => {
        // Reset Wallet Model 
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
