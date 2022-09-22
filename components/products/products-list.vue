<template>
  <div>
    <div v-for="product in products" :key="product.id">
      <span>{{ product.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsList',
  props: {
    products: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>
