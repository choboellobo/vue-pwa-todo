export default {
    namespaced: true,
    state: {
        selectedTask: null
    },
    getters: {
        getSelectedTask(state) {
            return state.selectedTask
        }
    },
    mutations: {
        setSelectedTask(state, payload) {
            state.selectedTask = payload
        }
    },
}
