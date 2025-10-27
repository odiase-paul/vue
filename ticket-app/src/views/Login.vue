<template>
  <main class="hero p-10 px-4 my-6 mx-auto font-nunito">
    <h2 class="text-center font-semibold text-[min(10vw,1.5rem)] mb-5">Login</h2>
    <form class="flex flex-col gap-5" @submit.prevent="submit">
      <label class="flex flex-col sm:flex-row gap-5 sm:items-center"
        >Username<input class="outline-none bg-gray-100" v-model="u" /></label
      ><label class="flex flex-col sm:flex-row gap-5 sm:items-center"
        >Password<input class="outline-none bg-gray-100" type="password" v-model="p"
      /></label>
      <div v-if="err" style="color: red">{{ err }}</div>
      <button class="card cursor-pointer mt-2" type="submit">Login</button>
    </form>
  </main>
</template>
<script>
export default {
  data() {
    return { u: '', p: '', err: '' }
  },
  methods: {
    submit() {
      this.err = ''
      const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
      const found = users.find((x) => x.username === this.u && x.password === this.p)
      if (!found) {
        this.err = 'Invalid credentials'
        this.$toast.error(this.err)
        return
      }
      const token = btoa(this.u + Date.now())
      localStorage.setItem('ticketapp_session', JSON.stringify({ token, user: this.u }))

      this.$router.push('/dashboard').then(() => {
        this.$toast.success('Welcome')
      })
    },
  },
}
</script>
