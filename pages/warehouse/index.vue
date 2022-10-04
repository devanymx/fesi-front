<template>
  <b-container class="warehouses-container" fluid>
    <p class="h2 text-dark-80">
      Sección de departamentos
    </p>
    <CrudTable
      :columns="[
        'id',
        {key: 'name', label: 'Nombre del departamento'},
        {key: 'detail', label: 'Detalle del departamento'},
        { key: 'action', label: 'Acciones', tdClass: 'actions-column-header' }
      ]"
      :searchable="true"
      :form-fields="{ name: '', detail: '' }"
      :initial-table-data="warehouses"
      crud-title="Departamento"
      :actions-methods="{
        deleteItem: deleteWarehouse,
        createItem: createWarehouse,
        editItem: editWarehouse
      }">
      <template #input-fields="{ formdata }">
        <b-form-group id="input-group-2" label="Nombre de almacén" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.name"
            required
            placeholder="Enter name" />
        </b-form-group>
        <b-form-group id="input-group-2" label="Detalle de almacén" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="formdata.detail"
            required
            placeholder="Enter name" />
        </b-form-group>
      </template>
    </CrudTable>
  </b-container>
</template>

<script>
import { WarehousesServices } from '~/services/warehousesServices'

export default {
  name: 'WarehousesView',
  middleware: ['auth'],
  async asyncData ({ $axios }) {
    const warehouses = await WarehousesServices($axios).getWarehouses()
    return { warehouses }
  },
  data () {
    return {
      warehouses: []
    }
  },
  methods: {
    async deleteWarehouse (warehouseId) {
      return await WarehousesServices(this.$axios).deleteWarehouse(warehouseId)
    },
    async createWarehouse ({ name, detail }) {
      return await WarehousesServices(this.$axios)
        .createWarehouse({ name, detail })
    },
    async editWarehouse (warehouseId, { name, detail }) {
      return await WarehousesServices(this.$axios)
        .mutateWarehouse(warehouseId,
          { name, detail })
    }
  },
  fetchOnServer: true,
  fetchKey: 'warehouse-page'
}
</script>

<style>
.warehouses-container {
  width: calc(100% - 7rem);
}
</style>
