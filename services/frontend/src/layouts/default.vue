<template>
  <div>
    Default template
    <Nuxt />
    <Modal />
  </div>
</template>
<script>
import Modal from '@/components/Modal'

export default {
  components: {
    Modal,
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/layouts/default.scss';
</style>
