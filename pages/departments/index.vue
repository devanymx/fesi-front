<template>
  <b-container class="departments-container" fluid>
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
      :form-fields="{ name: '' }"
      :initial-table-data="departments"
      :actions-methods="{
        deleteItem: deleteDepartment
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
import { DepartmentsServices } from '~/services/departmentsServices'

export default {
  name: 'DepartmentsView',
  middleware: ['auth'],
  async asyncData ({ $axios }) {
    const departments = await DepartmentsServices($axios).getDepartments()
    return { departments }
  },
  data () {
    return {
      departments: []
    }
  },
  methods: {
    async deleteDepartment (departmentId) {
      return await DepartmentsServices(this.$axios).deleteDepartment(departmentId)
    }
  },
  fetchOnServer: true,
  fetchKey: 'department-page'
}
</script>

<style>
.departments-container {
  width: calc(100% - 7rem);
}
</style>
