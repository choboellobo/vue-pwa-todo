<template lang="pug">
  div
    Navbar.hide-buttons-right(:title="title" :backButton="true")
    div.margin-top-1(v-if="wallet")
      .row(v-if="wallet.tasks")
        .col.s12
          ul.collection
            li.collection-item(v-for="(task, key) in tasksOrdered")
              label
                input(type="checkbox" :checked="task.completed" @change="toggleTask(key)")
                span(:class="{'completed': task.completed}") {{task.name}}
              Dropdown
                li
                  a Eliminar                    
    //outviewport
    Loading(v-if="!wallet")
    Fab.right-top-edge
      a.btn-floating.blue.darken-1
        i.large.material-icons add
    Fab( v-if="wallet && wallet.tasks")
      a.btn-floating.btn-large.red(@click="removeAllTasks")
        i.large.material-icons delete_forever
    EmptyContent(v-if="wallet && !wallet.tasks" icon="add" text="Haz clik en el icono + para añadir productos a tu lista")
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
  computed: {
    title() {
      return this.wallet ? this.wallet.name : ''
    },
    tasksOrdered() {
      let list = []
        for(let i in this.wallet.tasks){
          this.wallet.tasks[i].key = i;
          list.push(this.wallet.tasks[i])
        }
      return list.sort((a,b) => !a.completed).reverse()
    }
  },
  mounted(){
    this.db = this.$firebase.database();
    this.db.ref('/wallets/'+ this.$route.params.key)
            .on('value', snapshot => {
                this.wallet = snapshot.val()
            })
  },
  methods: {
        removeAllTasks() {
            let confirm = window.confirm("Desea borrar todas las tareas")
            if(confirm) this.db.ref('/wallets/'+ this.$route.params.key + '/tasks').set([])
        },
        toggleTask(keyTask){
            this.db.ref('/wallets/'+ this.$route.params.key + '/tasks/'+ keyTask)
                .transaction(data => {
                    data.completed = !data.completed;
                    return data
                })
        }
  }
}
</script>
<style src="./products-list.scss" lang="scss" scoped></style>
