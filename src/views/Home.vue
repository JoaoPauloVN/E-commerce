<template>
  <div class="home">
    <Banner />
    <StoreSection />
  </div>
</template>

<script>
  import Banner from "@/components/Banner.vue"
  import StoreSection from "@/components/StoreSection.vue"

  export default {
    name: "Home",
    data() {
      return {

      }
    },
    components: {
      Banner,
      StoreSection
    }
  }
</script>
