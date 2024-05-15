const API_URL = "http://localhost:3000/api/v1"

const app = Vue.createApp( {
  data() { return { buffets: [] } },
  mounted() { this.fetchBuffets() },

  methods: {
    async fetchBuffets() {
      this.buffets = await(await fetch(`${API_URL}/buffets`)).json()
    },

    getFullAddress(buffet) {
      return `${buffet.address} - ${buffet.district}, ${buffet.city} - 
        ${buffet.state}, ${buffet.cep.substring(0, 5)}-${buffet.cep.substring(5)}`
    },

    formatPhone(phone) {
      if(phone.length === 11) {
        return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`
      }

      return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6, 10)}`
    },
  }
})

app.mount('#app')