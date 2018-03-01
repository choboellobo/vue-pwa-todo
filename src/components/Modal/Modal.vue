<template lang="pug">
  .modal(ref="modal")
    .modal-content
      h4 aquí el content
    .modal-footer
      a.btn.modal-close Cerrar
</template>

<script>
export default {
  mounted() {
    let modal = this.$materialize.Modal.init(this.$refs.modal, {});
    let instance = this.$materialize.Modal.getInstance(this.$refs.modal);
    this.$emit('mounted', instance)
  }
}
</script>

<style src="./Modal.scss" lang="scss" scoped></style>
