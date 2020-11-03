<template>
  <div v-if="modal.show" class="modal__wrapper">
    <div class="modal__scroll-wrapper">
      <div class="modal__content">
        <span v-html="modal.message"></span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      modal: (state) => state.modal,
    }),
  },
  methods: {
    ...mapMutations({
      close: 'CLOSE_MODAL',
    }),
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Modal.scss';
</style>
