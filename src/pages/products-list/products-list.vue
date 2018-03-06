<template lang="pug">
  div
    Navbar.hide-buttons-right(:title="wallet.name" :backButton="true")
    .container
      .row
        .col.s12
          ul.collection
            li.collection-item(v-for="task in wallet.tasks")
              label
                input(type="checkbox" :checked="task.completed")
                span.completed {{task.name}}
              a.secondary-content #[i.material-icons more_vert]
    //outviewport
    Fab.right-top-edge
      a.btn-floating.blue.darken-1
        i.large.material-icons add
    Fab
      a.btn-floating.btn-large.red
        i.large.material-icons delete_forever
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  data() {
    return {
      db: null,
      wallet: null
    }
  },
  mounted(){
    this.db = this.$firebase.database();
    this.db.ref('/wallets/'+ this.$route.params.key)
            .on('value', snapshot => {
                this.wallet = snapshot.val()
            })
  }
}
</script>
<style src="./products-list.scss" lang="scss" scoped></style>
