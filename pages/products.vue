<template>
  <div>
    <span>Productos</span>
    <products-list :products="products" />
  </div>
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
