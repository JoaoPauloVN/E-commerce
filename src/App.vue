<template>
  <div>
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
  import Footer from "./components/Footer.vue"
  import Header from "./components/Header.vue"
  import { MapState } from "vuex"

  export default({
    components: {
      Footer,
      Header
    }
  })
</script>

<style lang="scss">
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
 }
 .center {
   max-width: 1300px;
   padding: 0 2%;
   margin: 0 auto;
 }

 body {
    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(57, 57, 57, 0.347);
        border-radius: 10px;
    }
 }
</style>
