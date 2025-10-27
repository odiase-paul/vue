<template>
  <div class="font-nunito sm:w-[350px]">
    <main class="hero my-6 mx-auto flex flex-col gap-4">
      <header class="flex flex-col gap-5">
        <h1 class="text-center font-semibold font-nunito text-[min(10vw,1.8rem)] mb-5">
          Your Tickets
        </h1>
        <router-link class="card py-2 px-4 text-center" to="/tickets/new"
          >Add New Ticket</router-link
        >
      </header>

      <div style="display: grid; gap: 12px">
        <div
          v-for="t in userTickets"
          :key="t.id"
          class="bg-[#2275ad] text-white rounded-md py-2 px-4 flex flex-col gap-3 justify-between items-center"
        >
          <div class="flex flex-col justify-center items-center">
            <p class="text-[1.2rem] font-semibold">
              Title: <span class="text-[1rem] font-semibold">{{ t.title }}</span>
            </p>
            <div>
              <p :class="`text-[1.1rem] font-semibold status-${t.status}`">
                Status: <span class="text-[1rem] font-semibold">{{ t.status }}</span>
              </p>
            </div>
          </div>

          <div class="flex gap-5">
            <router-link
              :to="`/tickets/${t.id}/edit`"
              class="border rounded-lg border-[#2275ad] bg-white text-[#2275ad] hover:bg-[#005f99] hover:text-white py-1 px-4 flex justify-center items-center font-semibold"
              >Edit</router-link
            ><button
              class="border rounded-lg border-[#2275ad] bg-white text-[#2275ad] hover:bg-[#005f99] hover:text-white px-4 flex justify-center items-center font-semibold!"
              @click="remove(t.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-if="userTickets.length === 0" class="text-center">No tickets yet</div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    const s = JSON.parse(localStorage.getItem('ticketapp_session') || 'null')
    const user = s ? s.user : ''
    const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets_v1') || '[]')
    return { user, tickets }
  },
  computed: {
    userTickets() {
      return this.tickets.filter((t) => t.user === this.user)
    },
  },
  methods: {
    remove(id) {
      if (!confirm('Delete ticket?')) return
      this.tickets = this.tickets.filter((x) => x.id !== id)
      localStorage.setItem('ticketapp_tickets_v1', JSON.stringify(this.tickets))
      this.$toast.success('Deleted')
    },
  },
}
</script>
