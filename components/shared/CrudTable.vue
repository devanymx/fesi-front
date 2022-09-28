<template>
  <div class="main-table-container">
    <div class="main-table-header mx-2">
      <div v-if="searchable" class="mx-2">
        <b-input-group
          size="md"
          prepend="Buscar"
        >
          <b-form-input />
          <b-input-group-append>
            <b-button size="md" text="Button" variant="primary">
              <fontawesome-icon icon="search" />
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <b-button class="header-button mb-2 px-4" variant="primary" size="md" @click="createItem">
        Agregar Producto
      </b-button>
    </div>
    <div class="custom-border-table">
      <b-table
        hover
        bordered
        :fixed="false"
        :items="tableData"
        :fields="columns"
        class="custom-table-class remove-border-table">
        <template #cell(action)="data">
          <div class="actions-column-field">
            <b-button
              variant="primary"
              size="sm"
              class="rounded-pill px-3"
              @click="editItem(data.item)">
              <!--eslint-disable-next-line-->
              <fontawesome-icon :icon="['fa', 'pencil']">
              </fontawesome-icon>
            </b-button>
            <b-button
              v-b-modal="'edit-modal'"
              variant="danger"
              class="rounded-pill px-3"
              size="sm"
              @click="deleteItem(data.item)">
              <!--eslint-disable-next-line-->
              <fontawesome-icon :icon="['fa', 'trash-can']">
              </fontawesome-icon>
            </b-button>
          </div>
        </template>
      </b-table>
    </div>
    <b-modal v-model="modalShow" :title="formTitle" hide-footer>
      <b-form @submit.prevent="save">
        <slot :formdata="editedItem" name="input-fields" />
        <b-button size="sm" variant="danger" @click="close">
          Cancel
        </b-button>
        <b-button type="submit" size="sm" variant="success">
          Submit
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'CrudTable',
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    formFields: {
      type:
        Array.of(Object),
      required: true,
      default: () => []
    },
    initialTableData: {
      type: Array,
      required: false,
      default: () => []
    },
    searchable: {
      type: Boolean,
      required: false,
      default: false
    },
    actionsMethods: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      editedItem: this.formFields,
      modalShow: false,
      editedIndex: -1,
      tableData: []
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  mounted () {
    this.tableData = this.initialTableData
    // axios(this.endpoint).then(response=>this.tableData = response.data.data);
  },
  methods: {
    createItem () {
      this.modalShow = true
      this.editedItem = Object.assign({}, this.formFields)
      this.editedIndex = -1
    },
    editItem (item) {
      this.modalShow = true
      this.editedIndex = this.tableData.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },
    async deleteItem (item) {
      const index = this.tableData.indexOf(item)
      const deleteSuccess = await this.actionsMethods.deleteItem(item?.id)
      if (deleteSuccess === true) {
        this.$bvToast.toast('Item eliminado correctamente', {
          title: 'Eliminado',
          variant: 'success',
          solid: true
        })
        this.tableData.splice(index, 1)
      } else {
        this.$bvToast.toast('Error al eliminar el item', {
          title: 'Error',
          variant: 'danger',
          solid: true
        })
      }
    },
    close () {
      this.modalShow = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.formFields)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.tableData[this.editedIndex], this.editedItem)
        // axios.put(`${this.endpoint}/${this.editedItem.id}`, this.editedItem)
      } else {
        this.tableData.push(this.editedItem)
        // axios.post(this.endpoint, this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style>
.custom-table-class {
  margin: 0;
}

.remove-border-table > td {
  border-top: none;
}

.custom-border-table {
  border: 1px solid rgb(33 19 13 / 33%);
  border-radius: 0.55rem;
  overflow: hidden;
}

.actions-column-field {
  display: flex;
  justify-content: space-around;
}

.actions-column-header {
  width: 8.5%;
}

.main-table-container {
  display: flex;
  flex-direction: column;
}

.main-table-header {
  display: flex;
  justify-content: flex-end;
}
</style>
