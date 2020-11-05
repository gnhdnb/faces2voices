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
    <player v-if="voiceURI && voiceURI.length" class="mb-20" :source="voiceURI">
      <div style="position: relative">
        Your voice<span
          style="
            display: block;
            height: 10px;
            width: 10px;
            position: absolute;
            top: -5px;
            right: -5px;
            border-radius: 50%;
            background: #f21e2b;
            animation: glowing 1s infinite;
          "
        ></span>
      </div>
    </player>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/components/Participant.scss';
</style>
