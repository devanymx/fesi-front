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
        {key: 'code', label: 'Nombre del producto'},
        {key: 'description', label: 'Detalle del producto'},
        {key: 'measurement', label: 'Código del producto'},
        {key: 'price', label: 'Descripción del producto'},
        {key: 'sale_price', label: 'Unidad del producto'},
        {key: 'profit', label: 'Costo del producto'},
        {key: 'unit', label: 'Ganancia del producto'},
        {key: 'minimum', label: 'Precio del producto'},
        {key: 'maximum', label: 'Mínimo del producto'},
        {key: 'taxes', label: 'Máximo del producto'},
        {key: 'image', label: 'Imagen del producto'},
        { key: 'action', label: 'Acciones', tdClass: 'actions-column-header' }
      ]"
      :searchable="true"
      crud-title="Producto"
      :form-fields="{
        name : '',
        detail : '',
        code : '',
        description : '',
        measurement : '',
        price : '',
        sale_price : '',
        profit : '',
        unit : '',
        minimum : '',
        maximum : '',
        taxes : '',
        image : ''
      }"
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
        <b-form-group id="input-group-2" label="Código del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.code"
            required
            placeholder="Introduce un código de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Descripción del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.description"
            required
            placeholder="Introduce la descripción del producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Unidad de medida del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.measurement"
            required
            placeholder="Introduce una unidad de medida de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Tipo de venta del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.unit"
            required
            placeholder="Introduce un tipo de venta de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Costo del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.price"
            required
            placeholder="Introduce un costo de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Ganancia del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.profit"
            required
            placeholder="Introduce un ganancia de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Precio de venta del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.sale_price"
            required
            placeholder="Introduce un precio de venta de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Mínimo del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.minimum"
            required
            placeholder="Introduce un mínimo de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Máximo del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.maximum"
            required
            placeholder="Introduce un máximo de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Impuesto del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.taxes"
            required
            placeholder="Introduce el impuesto de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Imagen del producto" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.image"
            required
            placeholder="Introduce una imagen de producto" />
        </b-form-group>
      </template>
    </CrudTable>
  </b-container>
</template>

<script>
import { ProductsServices } from '~/services/productsServices'

export default {
  name: 'ProductsView',
  middleware: ['auth'],
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
    // eslint-disable-next-line camelcase
    async createProduct ({ name, detail, code, description, measurement, price, sale_price, profit, unit, minimum, maximum, taxes, image }) {
      return await ProductsServices(this.$axios)
        .createProduct({
          name,
          detail,
          code,
          description,
          measurement,
          price,
          // eslint-disable-next-line camelcase
          sale_price,
          profit,
          unit,
          minimum,
          maximum,
          taxes,
          image,
          status: 1,
          department_id: 1,
          category_id: 1
        })
    },
    // eslint-disable-next-line camelcase
    async editProduct (productId, { name, detail, code, description, measurement, price, sale_price, profit, unit, minimum, maximum, taxes, image }) {
      return await ProductsServices(this.$axios).mutateProduct(
        productId,
        {
          name,
          detail,
          code,
          description,
          measurement,
          price,
          // eslint-disable-next-line camelcase
          sale_price,
          profit,
          unit,
          minimum,
          maximum,
          taxes,
          image,
          status: 1,
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
