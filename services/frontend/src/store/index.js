export const mutations = {
  SET_VALUE_TO_LOCALSTORAGE(state, { id, payload }) {
    const parsed = JSON.stringify(payload)
    localStorage.setItem(id, parsed)
  },
  SET_LOADER_PROPS(state, { id, propID, value }) {
    if (!state.loaders[id]) {
      state.loaders[id] = {
        status: 'loading',
        message: 'loading',
        hidden: true,
      }
    }
    state.loaders[id][propID] = value
  },
  SET_PARTICIPANT_VALUE(state, payload) {
    state.participant = payload
  },
}
export const getters = {
  GET_VALUE_FROM_LOCALSTORAGE: () => {
    return (id) => {
      return localStorage.getItem(id)
        ? JSON.parse(localStorage.getItem(id))
        : null
    }
  },
  GET_LOADER_BY_ID: (state) => {
    return (id) => {
      return state.loaders[id] ? state.loaders[id] : state.loaders.default
    }
  },
}

export const state = () => ({
  participant: false,
  loaders: {
    default: {
      status: 'loading',
      message: 'loading',
      hidden: false,
    },
  },
})
