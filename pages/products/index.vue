<template>
  <b-container class="products-container" fluid>
    <p class="h2 text-dark-80">
      Sección de productos
    </p>
    <CrudTable
      :columns="[
        'id',
        {key: 'name', label: 'Nombre del producto'},
        {key: 'detail', label: 'Detalle del producto'},
        { key: 'action', label: 'Acciones', tdClass: 'actions-column-header' }
      ]"
      :searchable="true"
      :form-fields="{ name: '' }"
      :initial-table-data="products"
      :actions-methods="{
        deleteItem: deleteProduct
      }">
      <template #input-fields="{ formdata }">
        <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
          <b-form-input id="input-2" v-model="formdata.name" required placeholder="Enter name" />
        </b-form-group>
      </template>
    </CrudTable>
  </b-container>
</template>

<script>
import { ProductsServices } from '~/services/productsServices'

export default {
  name: 'ProductsView',
  async asyncData ({ $axios }) {
    const products = await ProductsServices($axios).getProducts()
    return { products }
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    async deleteProduct (productId) {
      return await ProductsServices(this.$axios).deleteProduct(productId)
    }
  },
  fetchOnServer: true,
  fetchKey: 'products-page'
}
</script>

<style>
.products-container {
  width: calc(100% - 7rem);
}
</style>
