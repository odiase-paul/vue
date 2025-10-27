<template>
  <main class="hero p-10 px-4 my-6 mx-auto">
    <h2 class="text-center font-semibold font-nunito text-[min(10vw,1.5rem)] mb-5">Sign up</h2>
    <form class="flex flex-col gap-5" @submit.prevent="submit">
      <label class="flex flex-col sm:flex-row gap-5 sm:items-center"
        >Username<input class="outline-none bg-gray-100" v-model="u"
      /></label>
      <label class="flex flex-col sm:flex-row gap-5 sm:items-center"
        >Password<input class="outline-none bg-gray-100" type="password" v-model="p"
      /></label>
      <label class="flex flex-col sm:flex-row gap-5 sm:items-center"
        >Password<input class="outline-none bg-gray-100" type="password" v-model="cp"
      /></label>
      <div v-if="err" style="color: red">{{ err }}</div>
      <button class="card cursor-pointer mt-2 hover:bg-[#005f99]" type="submit">
        Create account
      </button>
    </form>
  </main>
</template>
<script>
export default {
  data() {
    return { u: '', p: '', cp: '', err: '' }
  },
  methods: {
    submit() {
      this.err = ''
      if (!this.u || !this.p || !this.cp) {
        this.err = 'Username and passwords required'
        this.$toast.error(this.err)
        return
      }
      const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]')
      if (users.find((x) => x.username === this.u)) {
        this.err = 'User exists'
        this.$toast.error(this.err)
        return
      }
      if (this.p !== this.cp) {
        this.err = "Password doesn't match"
        this.$toast.error(this.err)
        return
      }
      users.push({ username: this.u, password: this.p })
      localStorage.setItem('ticketapp_users', JSON.stringify(users))

      this.$router.push('/auth/login').then(() => {
        this.$toast.success('Account created')
      })
    },
  },
}
</script>
