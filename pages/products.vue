<template>
  <b-container class="products-container" fluid>
    <p class="h2 text-dark-80">
      Sección de productos
    </p>
    <products-list :products="products" />
  </b-container>
</template>

<script>
import { ProductsServices } from '~/services/productsServices'

export default {
  name: 'ProductsView',
  data () {
    return {
      products: []
    }
  },
  async fetch () {
    this.products = await ProductsServices().getProducts()
  },
  fetchOnServer: false,
  fetchKey: 'products-page'
}
</script>

<style>
.products-container {
  width: calc(100% - 7rem);
}
</style>
