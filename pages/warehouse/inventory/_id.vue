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
        {key: 'code', label: 'Código del producto'},
        {key: 'description', label: 'Descripcion del producto'},
        {key: 'measurement', label: 'Medida del producto'},
        {key: 'price', label: 'Precio del producto'},
        {key: 'sale_price', label: 'Costo del producto'},
        {key: 'profit', label: 'Ganancia del producto'},
        {key: 'unit', label: 'Unidad del producto'},
        {key: 'pivot.quantity', label: 'Inventario actual'},
        {key: 'minimum', label: 'Minimo del producto'},
        {key: 'maximum', label: 'Máximo del producto'},
        {key: 'taxes', label: 'Impuestos del producto'},
        {key: 'image', label: 'Imagen del producto'},
        { key: 'action', label: 'Acciones', tdClass: 'actions-column-header' }
      ]"
      :searchable="true"
      crud-title="Producto"
      :form-fields="{
        productId : '',
        quantity : '',
      }"
      :initial-table-data="products"
      :actions-methods="{
        createItem: addProductWarehouse,
      }">
      <template #input-fields="{ formdata }">
        <b-form-group id="input-group-2" label="Producto a agregar" label-for="products">
          <b-form-select
            id="products"
            v-model="formdata.productId"
            :options="productsList"
            required
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Cantidad del producto" label-for="quantity">
          <b-form-input
            id="quantity"
            v-model="formdata.quantity"
            type="number"
            required
            placeholder="Introduce una cantidad de producto" />
        </b-form-group>
      </template>
    </CrudTable>
  </b-container>
</template>

<script>
import { WarehousesServices } from '~/services/warehousesServices'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
export default {
  name: 'ProductsView',
  middleware: ['auth'],
  async asyncData ({ $axios, params }) {
    const id = params.id
    const products = await WarehousesServices($axios).getWarehouseProducts(id)
    return { products, id }
  },
  data () {
    return {
      products: [],
      productsList: []
    }
  },
  mounted () {
    this.getProductsList()
  },
  methods: {
    async addProductWarehouse ({ productId, quantity }) {
      return await WarehousesServices(this.$axios)
        .addWarehouseProduct(this.id,
          { product_id: productId, quantity })
    },
    getProductsList () {
      this.$axios.$get('/api/products').then(response => {
        response.data.forEach(category => {
          const dataProducts = {
            value: category.id,
            text: category.name
          }
          this.productsList.push(dataProducts)
        })
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
