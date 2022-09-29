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
      crud-title="Producto"
      :form-fields="{ name: '', detail: '' }"
      :initial-table-data="products"
      :actions-methods="{
        deleteItem: deleteProduct,
        createItem: createProduct,
        editItem: editProduct
      }">
      <template #input-fields="{ formdata }">
        <b-form-group id="input-group-2" label="Nombre del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.name"
            required
            placeholder="Introduce un nombre del producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Detalle del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.detail"
            required
            placeholder="Introduce un detalle de producto" />
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
    },
    async createProduct ({ name, detail }) {
      return await ProductsServices(this.$axios)
        .createProduct({
          name,
          detail,
          department_id: 1,
          category_id: 1
        })
    },
    async editProduct (productId, { name, detail }) {
      return await ProductsServices(this.$axios).mutateProduct(
        productId,
        {
          name,
          detail,
          department_id: 1,
          category_id: 1
        })
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
