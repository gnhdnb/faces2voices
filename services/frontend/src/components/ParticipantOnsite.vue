<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      imgURI: '',
      voiceURI: '',
    }
  },
  computed: {
    ...mapGetters({
      getValue: 'GET_VALUE_FROM_LOCALSTORAGE',
    }),
  },
  mounted() {
    const imgURI = this.getValue('imgURI')
    // validation
    if (imgURI) {
      this.imgURI = imgURI
    }
    const voiceURI = this.getValue('voiceURI')
    // validation
    if (voiceURI) {
      this.voiceURI = voiceURI
    }
  },
}
</script>
<template>
  <div class="participant__wrapper">
    <img
      v-if="imgURI && imgURI.length"
      class="participant__spectrogram mb-10"
      :src="imgURI"
    />
    <p id="title">Your voice is now live with the rest of the choir</p>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/components/Participant.scss';
</style>
