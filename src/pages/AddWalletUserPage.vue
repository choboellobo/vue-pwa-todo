<template lang="pug">
  main
    Loading
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['getUserData'])
    },
    data() {
        return {
           db : null
        }
    },
    mounted() {
        this.db = this.$firebase.database();
        let user = this.getUserData;
        if(user) {
            this.db.ref('/users/' + user.uid + '/wallets')
                .transaction(data => {
                    data = data || []
                    let walletId = this.$route.params.wallet
                    if(!(data.includes(walletId))){
                      Array.isArray(data) ? data.push(walletId) :  data = [walletId]
                    }else console.log('Ya existe ese wallet para ese cliente')
                    return data
                }).then(()=> this.$router.replace({name: 'Main'}))
        }else this.$router.replace({name: 'Login'})
    }
}
</script>