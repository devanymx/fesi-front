<template>
  <b-container class="products-container" fluid>
    <p class="h2 text-dark-80">
      Sección de productos
    </p>
    <CrudTable
      :columns="[
        'id',
        { key: 'name', label: 'Nombre del producto' },
        { key: 'detail', label: 'Detalle del producto' },
        { key: 'department.name', label: 'Departamento del producto' },
        { key: 'category.name', label: 'Categoría del producto' },
        { key: 'code', label: 'Código del producto' },
        { key: 'description', label: 'Descripción del producto' },
        { key: 'measurement', label: 'Medida del producto' },
        { key: 'price', label: 'Precio del producto' },
        { key: 'sale_price', label: 'Costo del producto' },
        { key: 'profit', label: 'Ganancia del producto' },
        { key: 'unit', label: 'Unidad del producto' },
        { key: 'minimum', label: 'Mínimo del producto' },
        { key: 'maximum', label: 'Máximo del producto' },
        { key: 'taxes', label: 'Impuestos del producto' },
        { key: 'image', label: 'Imagen del producto' },
        { key: 'action', label: 'Acciones', tdClass: 'actions-column-header' }
      ]"
      :searchable="true"
      crud-title="Producto"
      :form-fields="{
        name: '',
        detail: '',
        code: '',
        description: '',
        measurement: '',
        price: '',
        sale_price: '',
        profit: '',
        unit: '',
        minimum: '',
        maximum: '',
        taxes: '',
        image: '',
        department_id: '',
        category_id: ''
      }"
      :initial-table-data="products"
      :actions-methods="{
        deleteItem: deleteProduct,
        createItem: createProduct,
        editItem: editProduct
      }"
    >
      <template #input-fields="{ formdata }">
        <b-form-group id="input-group-2" label="Nombre del producto" label-for="name">
          <b-form-input id="name" v-model="formdata.name" required placeholder="Introduce un nombre del producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Detalle del producto" label-for="detail">
          <b-form-input id="detail" v-model="formdata.detail" required placeholder="Introduce un detalle de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Código del producto" label-for="code">
          <b-form-input id="code" v-model="formdata.code" required placeholder="Introduce un código de producto" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Descripción del producto" label-for="description">
          <b-form-input
            id="description"
            v-model="formdata.description"
            required
            placeholder="Introduce la descripción del producto"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Unidad de medida del producto" label-for="measurement">
          <b-form-input
            id="measurement"
            v-model="formdata.measurement"
            required
            placeholder="Introduce una unidad de medida de producto"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Tipo de venta del producto" label-for="unit">
          <b-form-input
            id="unit"
            v-model="formdata.unit"
            required
            placeholder="Introduce un tipo de venta de producto"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Costo del producto" label-for="price">
          <b-form-input
            id="price"
            v-model="formdata.price"
            required
            type="number"
            placeholder="Introduce un costo de producto"
            @change="onChangePrice(formdata.price)"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Ganancia del producto" label-for="profit">
          <b-form-input
            id="profit"
            v-model="formdata.profit"
            type="number"
            required
            placeholder="Introduce un ganancia de producto"
            @change="onChangeProfit(formdata.profit)"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Precio de venta del producto" label-for="sale_price">
          <b-form-input
            id="sale_price"
            v-model="productPrice.sale_price"
            type="number"
            required
            placeholder="Introduce un precio de venta de producto"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Mínimo del producto" label-for="minimum">
          <b-form-input
            id="minimum"
            v-model="formdata.minimum"
            type="number"
            required
            placeholder="Introduce un mínimo de producto"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Máximo del producto" label-for="maximum">
          <b-form-input
            id="maximum"
            v-model="formdata.maximum"
            type="number"
            required
            placeholder="Introduce un máximo de producto"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Impuesto del producto" label-for="taxes">
          <b-form-input
            id="taxes"
            v-model="formdata.taxes"
            type="number"
            required
            placeholder="Introduce el impuesto de producto"
          />
        </b-form-group>
        <b-form-group id="input-group-2" label="Imagen del producto" label-for="image">
          <b-form-input id="image" v-model="formdata.image" required placeholder="Introduce una imagen de producto" />
        </b-form-group>
        <vue-file-pond
          ref="pond"
          name="test"
          class="filepond"
          label-idle="Drop files here..."
          :allow-multiple="true"
          accepted-file-types="image/jpeg, image/png"
          server="/api"
          :files="myFiles"
          @init="handleFilePondInit"
        />
        <b-form-group id="input-group-2" label="Categoría del producto" label-for="category">
          <b-form-select id="category" v-model="formdata.category_id" :options="categories" required />
        </b-form-group>
        <b-form-group id="input-group-2" label="Departamento del producto" label-for="department">
          <b-form-select id="department" v-model="formdata.department_id" :options="departments" required />
        </b-form-group>
      </template>
    </CrudTable>
  </b-container>
</template>

<script>
import { ProductsServices } from '~/services/productsServices'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
export default {
  name: 'ProductsView',
  middleware: ['auth'],
  async asyncData ({ $axios }) {
    const products = await ProductsServices($axios).getProducts()
    return { products }
  },
  data () {
    return {
      products: [],
      categories: [],
      departments: [],
      productPrice: {
        price: '',
        profit: '',
        sale_price: ''
      },
      myFiles: ['cat.jpeg']
    }
  },
  mounted () {
    this.getCategories()
    this.getDepartments()
  },
  methods: {
    handleFilePondInit () {
      // eslint-disable-next-line no-console
      console.log('FilePond has initialized')
    },
    async deleteProduct (productId) {
      return await ProductsServices(this.$axios).deleteProduct(productId)
    },
    async createProduct ({
      name,
      detail,
      code,
      description,
      measurement,
      price,
      profit,
      unit,
      minimum,
      maximum,
      taxes,
      image
    }) {
      return await ProductsServices(this.$axios).createProduct({
        name,
        detail,
        code,
        description,
        measurement,
        price,
        sale_price: this.productPrice.sale_price,
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
    async editProduct (
      productId,
      {
        name,
        detail,
        code,
        description,
        measurement,
        price,
        profit,
        unit,
        minimum,
        maximum,
        taxes,
        image,
        department_id,
        category_id
      }
    ) {
      return await ProductsServices(this.$axios).mutateProduct(productId, {
        name,
        detail,
        code,
        description,
        measurement,
        price,
        sale_price: this.productPrice.sale_price,
        profit,
        unit,
        minimum,
        maximum,
        taxes,
        image,
        status: 1,
        department_id,
        category_id
      })
    },
    getCategories () {
      this.$axios.$get('/api/categories').then(response => {
        response.data.forEach(category => {
          const dataCategory = {
            value: category.id,
            text: category.name
          }
          this.categories.push(dataCategory)
        })
      })
    },
    getDepartments () {
      this.$axios.$get('/api/departments').then(response => {
        response.data.forEach(department => {
          const dataDepartment = {
            value: department.id,
            text: department.name
          }
          this.departments.push(dataDepartment)
        })
      })
    },
    onChangePrice (price) {
      this.productPrice.price = price
      if (!isNaN(this.productPrice.profit)) {
        this.changeSalePrice()
      }
    },
    onChangeProfit (profit) {
      this.productPrice.profit = profit
      if (!isNaN(this.productPrice.price)) {
        this.changeSalePrice()
      }
    },
    changeSalePrice () {
      this.productPrice.sale_price =
        Math.ceil(this.productPrice.price * (this.productPrice.profit / 100)) + parseInt(this.productPrice.price)
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
