<template>
  <div class="sm:w-[350px]">
    <main class="hero p-10 px-4 my-6 mx-auto">
      <h2 class="text-center font-semibold font-nunito text-[min(10vw,1.5rem)] mb-5">
        Create Ticket
      </h2>
      <form class="flex flex-col gap-5" @submit.prevent="add">
        <label class="flex flex-col sm:flex-row gap-5 sm:items-center"
          >Title<input class="outline-none bg-gray-100" v-model="title" /></label
        ><label class="flex flex-col sm:flex-row gap-5 sm:items-center"
          >Status<select class="outline-none bg-gray-100 cursor-pointer" v-model="status">
            <option value="open">open</option>
            <option value="in_progress">in_progress</option>
            <option value="closed">closed</option>
          </select></label
        >
        <div v-if="err" style="color: red">{{ err }}</div>
        <button class="bg-[#2275ad] hover:bg-[#005f99] text-white cursor-pointer" type="submit">
          Create
        </button>
      </form>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    const s = JSON.parse(localStorage.getItem('ticketapp_session') || 'null')
    const user = s ? s.user : ''
    return { user, title: '', status: 'open', err: '' }
  },
  methods: {
    add() {
      this.err = ''
      if (!this.title.trim()) {
        this.err = 'Title required'
        this.$toast.error(this.err)
        return
      }
      if (!['open', 'in_progress', 'closed'].includes(this.status)) {
        this.err = 'Invalid status'
        this.$toast.error(this.err)
        return
      }
      const all = JSON.parse(localStorage.getItem('ticketapp_tickets_v1') || '[]')
      const t = {
        id: Date.now().toString(),
        title: this.title,
        status: this.status,
        user: this.user,
        createdAt: new Date().toISOString(),
      }
      all.push(t)
      localStorage.setItem('ticketapp_tickets_v1', JSON.stringify(all))
      this.$toast.success('Ticket created')
      this.$router.push('/tickets')
    },
  },
}
</script>
