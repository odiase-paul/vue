<template>
  <div class="mt-10 mx-2 font-nunito">
    <header>
      <nav class="flex gap-4">
        <router-link to="/auth/login">Login</router-link>
        <router-link to="/auth/signup">Sign up</router-link>
      </nav>
    </header>
    <main class="hero mt-4">
      <h1 class="text-center font-bold text-[min(10vw,2rem)]">Ticketly</h1>
      <div class="relative">
        <div class="font-semibold text-[min(5vw,1.1rem)]">
          <h2 className="text-center">Manage, track, and resolve tickets</h2>
          <p className="text-center">All in one smart dashboard built for speed and clarity</p>
        </div>
        <div class="flex gap-2.5 mt-3">
          <router-link to="/auth/login" class="card py-2 px-4 inline-block flex-centralize"
            >Login</router-link
          >
          <router-link to="/auth/signup" class="card py-2 px-4 inline-block flex-centralize"
            >Get Started</router-link
          >
        </div>
      </div>

      <div
        class="circle"
        :style="{
          width: `100px`,
          height: `100px`,
          right: `10px`,
          top: `10px`,
          background: `#4f46e5`,
        }"
      />
      <div
        class="box"
        :style="{
          width: `90px`,
          height: `90px`,
          left: `10px`,
          top: `10px`,
          background: `#06b6d4`,
        }"
      />
      <svg viewBox="0 0 1440 320" className="wave">
        <path
          fill="#005f99"
          d="M0,160L48,165.3C96,171,192,181,288,186.7C384,192,480,192,576,165.3C672,139,768,85,864,69.3C960,53,1056,75,1152,96C1248,117,1344,139,1392,149.3L1440,160V320H0Z"
        ></path>
      </svg>
    </main>
  </div>
</template>
