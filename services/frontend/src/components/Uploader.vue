<template>
  <div class="uploader__wrapper">
    <div class="fileUploader__wrapper mb-20">
      <div>
        <svg-icon
          style="height: 30px; width: 30px"
          name="camera"
          @click="upload"
        />
      </div>
      <p class="upload">Upload photo</p>
    </div>
    <p @click="upload"></p>
    <img v-if="src" :src="src" />
    <player
      :source="`https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3`"
    >
      <div style="position: relative">
        Live<span
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
<script>
export default {
  data() {
    return {
      src: '',
      type: 'image',
    }
  },
  methods: {
    upload() {
      const context = this
      const input = document.createElement('input')
      const reader = new FileReader()
      input.type = 'file'
      input.onchange = (e) => {
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        reader.onload = (readerEvent) => {
          context.src = readerEvent.target.result
        }
      }
      input.click()
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/styles/components/Uploader.scss';
</style>
