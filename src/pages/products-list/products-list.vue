<template lang="pug">
  div
    Navbar.hide-buttons-right(:title="title" :backButton="true")
    div.margin-top-1
      .row(v-if="wallet && wallet.tasks")
        .col.s12
          ul.collection
            li.collection-item(v-for="($task, key) in tasksOrdered")
              label
                input(type="checkbox" :checked="$task.completed" @change="toggleTask($task.key)")
                span.truncate(style="width: 90%" :class="{'completed': $task.completed}") {{$task.name}}
              Dropdown
                li
                  a(@click=" openModalEdit($task)") Editar 
                li
                  a(@click="removeTask($task.key)") Eliminar                    
    //outviewport
    Loading(v-if="loading")
    // Fabs
    Fab.right-top-edge
      button.btn-floating.blue.darken-1(id="productListAdd" @click="addItemListModal.open(); $refs.inputTask.focus(); task.name = ''")
        i.large.material-icons add
    Fab( v-if="wallet && wallet.tasks")
      button.btn-floating.btn-large.red(@click="removeAllTasks")
        i.large.material-icons delete_forever
    // EmptyContent
    EmptyContent(v-if="wallet && !wallet.tasks && !loading" icon="add" text="Haz clik en el icono + para añadir productos a tu lista")
    // Modal
    Modal(@mounted="addItemListModal = $event")
      div.input-field(slot="content")
        input.validate(id="nombre" type="text" v-model="task.name" ref="inputTask")
        label(for="nombre") {{editKey ? 'Edite el nombre' : 'Ingrese un nombre' }} 
      div(slot="footer")
        button.modal-action.modal-close.waves-effect.waves-green.btn-flat CANCELAR
        button.modal-action.waves-effect.waves-green.btn-flat(v-if="editKey" :disabled="canAddTask" @click="editTaskName") EDITAR
        button.modal-action.waves-effect.waves-green.btn-flat(v-else :disabled="canAddTask" @click="addTask") ACEPTAR
    FeatureDiscovery(
        @close-feature-discovery="closeFeatureDiscovery" 
        @mounted="featureDiscovery = $event" 
        title="Añade productos" 
        content="Aquí podrás añadir los productos a tu cesta" 
        target="productListAdd")
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
// Observable
import { pushNotification } from '../../App';

export default {
  data() {
    return {
      loading: true,
      db: null,
      wallet: {},
      addItemListModal: null,
      task: {completed: false, name: ''},
      editKey: null,
      featureDiscovery: null
    }
  },
  computed: {
    ...mapGetters(['getFeatureDiscovery']),
    canAddTask() {
            return this.task.name.length === 0
    },
    title() {
      return this.wallet ? this.wallet.name : ''
    },
    tasksOrdered() {
      let list = []
        for(let i in this.wallet.tasks){
          this.wallet.tasks[i].key = i;
          list.push(this.wallet.tasks[i])
        }
      let orderList = []
      for(let item of list) {
        if(item.completed) orderList.push(item)
        else orderList.unshift(item)
      }
      return orderList
    }
  },
  mounted(){
    // Feature Discovery
    let $featureDiscovery  = this.getFeatureDiscovery
    if(!$featureDiscovery || !$featureDiscovery.productsList) {
      this.featureDiscovery.open();
    }
    // Observable for pushNotification;
    pushNotification.subscribe(console.log);

    this.db = this.$firebase.database()
  
    this.db.ref('/wallets/'+ this.$route.params.key)
           .on('value', snapshot => {
               this.wallet = snapshot.val()
               this.loading = false
            })
    
  },
  methods: {
      ...mapMutations(['updateFeatureDiscovery']),
      closeFeatureDiscovery() {
        this.updateFeatureDiscovery({key: 'productsList'})
      },
      openModalEdit(task) {
        this.task.name = task.name;
        this.editKey = task.key;
        this.addItemListModal.open(); 
        this.$refs.inputTask.focus()

      },
      addTask(){
          // Close the modal :)
          this.addItemListModal.close()
          // Add Firebase push
          this.db.ref('/wallets/'+ this.$route.params.key + '/tasks')
              .push(this.task)
              .then(() => this.resetInputs() )
        },
        removeTask(taskId) {
            let confirm = window.confirm("Desea borrar este item")
            if(!confirm) return 
            this.db.ref('/wallets/'+ this.$route.params.key + '/tasks/'+ taskId).remove()
        },
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
        },
        editTaskName() {
          // Set new name
          let new_name = this.task.name;
           // Close the modal :)
          this.addItemListModal.close()

          this.db.ref('/wallets/'+ this.$route.params.key + '/tasks/'+ this.editKey)
            .transaction(data => {
              data.name = new_name
              return data
            })
            // Clear task name input
            this.task.name = ''
            // Clear editKey
            this.editKey = null
            // Reset Input
            this.resetInputs()
        },
        resetInputs() {
           this.$materialize.updateTextFields();
        }
  }
}
</script>
<style src="./products-list.scss" lang="scss" scoped></style>
