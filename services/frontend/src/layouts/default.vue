<template>
  <div>
    <!--<Modal/>-->
    Default template
    <Nuxt/>
  </div>
</template>
<script>
import Modal from '@/components/Modal'
import { mapMutations } from 'vuex'
export default {
  components: {
    Modal,
  },
}
</script>
<style lang='scss'>
@import '@/assets/styles/layout/default.scss';
</style>
