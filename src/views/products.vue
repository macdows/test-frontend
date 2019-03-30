<template>
  
</template>

<script>
export default {
  name: 'products',
  data () {
    return {
      products: []
    }
  },
  created () {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(console.log)
      .catch(console.log)
  },
}
</script>

<style lang="scss" scoped>

</style>

