const API_URL = "http://localhost:3000/api/v1"

const app = Vue.createApp( {
  data() {
    return { 
      query: '',
      buffets: [],
      eventTypes: [],
      selectedBuffet: null,
      selectedEventType: null
    }
  },

  mounted() { this.fetchBuffets() },

  computed: { 
    filteredBuffets() {
      if(this.query) {
        return this.buffets.filter(buffet => {
          return buffet.brand_name.toLowerCase()
            .includes(this.query.toLowerCase())
        })
      }

      return this.buffets
    }
  },

  methods: {
    async fetchBuffets() {
      this.buffets = await(await fetch(`${API_URL}/buffets`)).json()
    },

    async fetchEventTypes(buffet) {
      this.eventTypes = await
        (await fetch(`${API_URL}/buffets/${buffet.id}/event_types`)).json()
    },

    selectBuffet(index) {
      this.selectedBuffet = this.buffets[index]
      this.fetchEventTypes(this.selectedBuffet)
    },

    selectEventType(index) {
      this.selectedEventType = this.eventTypes[index]
      console.log(this.selectedEventType)
    },

    getFullAddress(buffet) {
      return `${buffet.address} - ${buffet.district}, ${buffet.city} - 
              ${buffet.state}, ${buffet.cep.substring(0, 5)}-
              ${buffet.cep.substring(5)}`
    },

    formatPhone(phone) {
      if(phone.length === 11) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`
      }

      return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`
    },

    zeroOneToText(value) { return value == 0 ? "Não" : "Sim" }
  }
})

app.mount('#app')