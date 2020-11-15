<template>
  <div v-if="!loader.hidden" class="loader__wrapper">
    <div class="loader__icon">
      <img
        v-if="loader.status === 'loading'"
        :src="require(`~/assets/svg/loader.svg`)"
      />
      <svg-icon
        v-else-if="loader.status === 'error'"
        class="rotated45 error"
        name="cross"
      />
    </div>
    <span v-if="loader.message.length" class="loader__msg">{{
      loader.message
    }}</span>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/components/Loader.scss';
</style>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    ...mapGetters({
      getLoader: 'GET_LOADER_BY_ID',
    }),
    loader() {
      return this.getLoader(this.id)
    },
  },
}
</script>
