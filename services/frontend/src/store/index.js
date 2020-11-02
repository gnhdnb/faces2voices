export const actions = {
    saveDefaultValueInLocalStorage({ state, dispatch }, payload) {
      localStorage.removeItem(payload.id)
      dispatch('saveValueInLocalStorage', payload)
    },
    saveValueInLocalStorage({ state }, { id, payload }) {
      const parsed = JSON.stringify(payload)
      localStorage.setItem(id, parsed)
    },
  }
  
  export const mutations = {
    CLOSE_MODAL(state) {
      state.modal = {
        size: 'small',
        show: false,
        message: 'Modal',
      }
    },
    SHOW_MODAL(state, { size, message, justifyContent, alignItems }) {
      state.modal = {
        show: true,
        size: size || 'small',
        justifyContent: justifyContent || 'center',
        alignItems: alignItems || 'center',
        message: message || 'Modal',
      }
    },
  }
  
  export const state = () => ({
    defaultURL: '',
    modal: {
      show: false,
      size: 'small',
      message: '',
    },
  })
  