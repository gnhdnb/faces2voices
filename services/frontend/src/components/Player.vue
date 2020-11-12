<template>
  <div ref="player" class="player__wrapper">
    <div
      class="player__controls"
      :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
    >
      <loader v-if="showLoader" :id="`player`" :show_text="false" />
      <svg-icon
        v-else
        style="height: 18px; width: 20px"
        :name="play ? 'pause' : 'play'"
        @click="start"
      />
    </div>
    <div class="player__slot-wrapper">
      <slot />
    </div>
    <div class="volume-container">
      <div class="volume-button" @click="mute">
        <svg-icon
          style="height: 18px; width: 20px"
          :name="muted ? 'muted_speaker' : 'speaker'"
        />
      </div>
      <div ref="volumeSlider" class="volume-slider">
        <div ref="volumePercentage" class="volume-percentage"></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Tone from 'tone'
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      play: false,
      muted: false,
      showLoader: false,
      first: true,
      time: 0,
    }
  },
  methods: {
    start() {
      const context = this
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Player.scss';
</style>
