<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState, mapMutations, mapGetters } from 'vuex'
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
    ...mapState({
      participant: (state) => state.participant,
    }),
  },
  watch: {
    participant(newValue, oldValue) {
      const context = this

      if (newValue) {
        console.log('timeout is set')
        setTimeout(function () {
          const newUUID = uuidv4()
          context.setValue({ id: 'uuid', payload: newUUID })
          context.uuid = newUUID

          context.isParticipant(false)
          context.setValue({ id: 'participant', payload: false })
        }, 45 * 1000)
      }
    },
  },
  mounted() {
    const newUUID = uuidv4()
    this.setValue({ id: 'uuid', payload: newUUID })
    this.uuid = newUUID

    this.isParticipant(false)
    this.setValue({ id: 'participant', payload: false })
  },
  methods: {
    ...mapMutations({
      setValue: 'SET_VALUE_TO_LOCALSTORAGE',
      isParticipant: 'SET_PARTICIPANT_VALUE',
    }),
  },
}
</script>
<template>
  <div class="page__wrapper">
    <p class="title mt-20 mb-10">Faces2Voices</p>
    <camera v-if="!participant" class="mb-10" />
    <participant-onsite v-else class="mb-10" />
    <p id="title">Privacy statement</p>
    <p class="description mb-20">
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
    <p id="inspired" class="mb-10">
      we reflected on
      <a
        class="mb-20 links"
        target="_blank"
        href="https://arxiv.org/pdf/1905.09773.pdf"
      >
        Speech2Face
      </a>
    </p>
    <p id="developer" class="mb-10">
      designed by
      <a class="links" href="https://reverse-studio.web.app/faces2voices"
        ><u>Nikita Morozov</u></a
      >
    </p>
    <!--
    <a
      class="mb-20"
      target="_blank"
      href="https://github.com/morozovspace/morozovspace.github.io"
    >
      <svg-icon style="height: 30px; width: 30px" name="github" />
    </a>
    -->
  </div>
</template>
<style lang="scss">
@import '@/assets/styles/pages/index.scss';
</style>
