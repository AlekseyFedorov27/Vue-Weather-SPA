<template>
  <div class="wrapper">
<header >
  <nav class="blue darken-1">
    <div class="nav-wrapper container">
      <a href="#" class="brand-logo">Погода</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li class="navbar-item" v-for="link in links" :key="link.title">
          <router-link class="navbar-link" :title="link.title" :to="link.url">{{ link.title }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</header>

<router-view></router-view>


    <!-- <footer></footer> -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { title: 'Home', url: '/' },
        { title: 'Example', url: '/example' },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
    width: 90%;
}
</style>
