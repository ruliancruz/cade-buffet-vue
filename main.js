const API_URL = "http://localhost:3000/api/v1"

const app = Vue.createApp( {
  data() {
    return { 
      buffetQuery: '',
      buffets: [],

      eventTypes: [],
      selectedBuffet: null,

      selectedEventType: null,
      dateField: '',
      attendeeQuantityField: null,
      availableEvent: null,
      prices: [],
      message: null,
    }
  },

  mounted() { this.fetchBuffets() },

  computed: { 
    filteredBuffets() {
      if(this.buffetQuery) {
        return this.buffets.filter(buffet => {
          return buffet.brand_name.toLowerCase()
            .includes(this.buffetQuery.toLowerCase())
        })
      }

      return this.buffets
    },
  },

  methods: {
    async fetchBuffets() {
      this.buffets = await(await fetch(`${API_URL}/buffets`)).json()
    },

    async fetchEventTypes(buffet) {
      this.eventTypes = await
        (await fetch(`${API_URL}/buffets/${buffet.id}/event_types`)).json()
    },

    async checkEventAvailability() {
      result = await(await fetch(`${API_URL}/event_types/${this.selectedEventType.id}?date=${this.dateField}&attendee_quantity=${this.attendeeQuantityField}`)).json()

      if(result.available == 1) {
        this.availableEvent = true
        this.prices = result.preview_prices
      } else {
        this.availableEvent = false
        this.message = result.message
      }
    },

    selectBuffet(index) {
      this.selectedBuffet = this.buffets[index]
      this.fetchEventTypes(this.selectedBuffet)
    },

    selectEventType(index) { this.selectedEventType = this.eventTypes[index] },

    closeEventType() { 
      this.selectedEventType = null
      this.availableEvent = false
    },

    getFullAddress(buffet) {
      return `${buffet.address} - ${buffet.district}, ${buffet.city} - 
              ${buffet.state}, ${buffet.cep.substring(0, 5)}-
              ${buffet.cep.substring(5)}`
    },

    formatPhone(phone) {
      if(phone.length == 11) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`
      }

      return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`
    },

    zeroOneToText(value) { return value == 0 ? "Não" : "Sim" },

    formatPrice(price) {
      return price.toLocaleString('pt-BR',
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}
  }
})

app.mount('#app')