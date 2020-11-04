<script>
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      uuid: '',
    }
  },
  computed: {
    ...mapGetters({
      getValue: 'GET_VALUE_FROM_LOCALSTORAGE',
    }),
  },
  mounted() {
    const uuid = this.getValue('uuid')
    // validation
    if (uuidValidate(uuid)) {
      this.uuid = uuid
    } else {
      // generate new uuid
      const newUUID = uuidv4()
      this.setValue({ id: 'uuid', payload: newUUID })
      this.uuid = newUUID
    }
  },
  methods: {
    ...mapMutations({
      setValue: 'SET_VALUE_TO_LOCALSTORAGE',
    }),
  },
}
</script>
<template>
  <div class="page__wrapper">
    <p class="title mt-40 mb-20">Faces2Voices</p>
    <player
      class="mb-20"
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
    <p class="description mb-30">
      Faces2Voices is an online interactive installation which uses facial
      recognition technology to create a generative music composition based on
      imaginary voices of online visitors. The composition is evolving in time
      depending on the contributions of people involved.
    </p>
    <p class="description mb-40">
      Faces2Voices is an online interactive installation which uses facial
      recognition technology to create a generative music composition based on
      imaginary voices of online visitors. The composition is evolving in time
      depending on the contributions of people involved.
    </p>
    <camera class="mb-20" />
    <p id="privacy_statement" class="mb-30">
      <span class="bold">Privacy statement</span><br />
      We are implementing a responsible data policy. The project doesn't store
      or share personal data of participants, but only save and use fictional
      voice synthesiser metadata.
    </p>
    <p id="authors" class="mb-10">
      Faces2Voices is a project by
      <a class="links" target="_blank" href="http://nikonole.com/">
        Helena Nikonole</a
      >
      and
      <a class="links" href="https://gnhdnb.github.io" target="_blank"
        >Nikita Prudnikov</a
      >
    </p>
    <p id="developer" class="mb-10">
      designed by
      <a class="links" href="https://morozovspace.github.io"
        ><u>Nikita Morozov</u></a
      >
    </p>
    <a
      class="mb-20"
      target="_blank"
      href="https://github.com/morozovspace/morozovspace.github.io"
    >
      <svg-icon style="height: 30px; width: 30px" name="github" />
    </a>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/pages/index.scss';
</style>
