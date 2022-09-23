<template>
  <CrudTable
    :columns="[
      'id',
      {key: 'name', label: 'Nombre del producto'},
      {key: 'detail', label: 'Detalle del producto'},
      { key: 'action', label: 'Acciones', tdClass: 'actions-column-header' }
    ]"
    :searchable="true"
    :form-fields="{ name: '' }"
    :initial-table-data="products">
    <template #input-fields="{ formdata }">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input id="input-2" v-model="formdata.name" required placeholder="Enter name" />
      </b-form-group>
    </template>
  </CrudTable>
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
