<template>
  <div v-if="ticket" class="sm:w-[350px]">
    <main class="hero my-6 mx-auto">
      <h2 class="text-center font-semibold font-nunito text-[min(10vw,1.5rem)] mb-5">
        Edit Ticket
      </h2>
      <form class="flex flex-col gap-5" @submit.prevent="save">
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
        <button
          class="bg-[#2275ad] hover:bg-[#005f99] text-white cursor-pointer mt-2"
          type="submit"
        >
          Save
        </button>
      </form>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    const id = this.$route.params.id
    const all = JSON.parse(localStorage.getItem('ticketapp_tickets_v1') || '[]')
    const t = all.find((x) => x.id === id)
    const s = JSON.parse(localStorage.getItem('ticketapp_session') || 'null')
    const user = s ? s.user : ''
    return { id, ticket: t, title: t ? t.title : '', status: t ? t.status : 'open', err: '', user }
  },
  methods: {
    save() {
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
      const next = all.map((x) =>
        x.id === this.id
          ? { ...x, title: this.title, status: this.status, updatedAt: new Date().toISOString() }
          : x
      )
      localStorage.setItem('ticketapp_tickets_v1', JSON.stringify(next))
      this.$toast.success('Ticket updated')
      this.$router.push('/tickets')
    },
  },
}
</script>
