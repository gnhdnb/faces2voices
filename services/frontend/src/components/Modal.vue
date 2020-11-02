<template>
<div class="modal__wrapper" v-if="modal.show">
    <div class="modal__scroll-wrapper">
        <div class="modal__content">
            <span v-html="modal.message"></span>
        </div>
        <div class="modal__close">
            <svg-icon @click="close" class="rotated45" name="dark/cross"/>
        </div>
    </div>
</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            modal: state => state.modal
        })
    },
    methods: {
        ...mapMutations({
            close: 'CLOSE_MODAL'
        })
    }
}
</script>
<style lang='scss'>
@import '@/assets/styles/components/Modal.scss';
</style>