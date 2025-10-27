<template>
  <div class="sm:w-[350px] font-nunito">
    <main class="hero my-6 mx-auto">
      <header>
        <h1 class="text-center font-semibold font-nunito text-[min(10vw,1.8rem)] mb-5">
          Dashboard
        </h1>
      </header>
      <div class="min-w-[250px] flex flex-col gap-3">
        <div class="rounded-2xl bg-[#2275ad] text-white p-4">
          <h3 class="font-semibold text-[1.1rem]">Total Tickets</h3>
          <p>{{ total }}</p>
        </div>
        <div class="rounded-2xl bg-[#2275ad] text-white p-4">
          <h3 class="font-semibold text-[1.1rem]">Open</h3>
          <p>{{ open }}</p>
        </div>
        <div class="rounded-2xl bg-[#2275ad] text-white p-4">
          <h3 class="font-semibold text-[1.1rem]">Closed</h3>
          <p>{{ closed }}</p>
        </div>
      </div>
      <div class="mt-5 flex justify-between">
        <router-link
          class="border-[#2275ad] border rounded-lg px-2 py-[5px] flex items-center justify-center hover:bg-[#005f99] hover:text-white transition-all cursor-pointer"
          to="/tickets"
          >Manage Tickets</router-link
        >
        <div>
          <button
            class="border-[#2275ad] border flex items-center justify-center hover:bg-[#005f99] hover:text-white transition-all cursor-pointer flex-centralize"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
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
    total() {
      return this.tickets.filter((t) => t.user === this.user).length
    },
    open() {
      return this.tickets.filter((t) => t.user === this.user && t.status === 'open').length
    },
    closed() {
      return this.tickets.filter((t) => t.user === this.user && t.status === 'closed').length
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('ticketapp_session')
      this.$router.push('/').then(() => {
        this.$toast.success('Logged out')
      })
    },
  },
}
</script>
