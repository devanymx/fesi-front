<template>
  <div>
    <b-button class="mb-2" variant="primary" size="sm" @click="createItem">
      Create
    </b-button>

    <b-table striped hover :items="tableData" :fields="columns">
      <template #cell(action)="data">
        <b-button variant="primary" size="sm" @click="editItem(data.item)">
          Edit
        </b-button>
        <b-button v-b-modal="'edit-modal'" variant="danger" size="sm" @click="deleteItem(data.item)">
          Delete
        </b-button>
      </template>
    </b-table>

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
        Array.of(
          { key: { type: String, default: '' } }
        ),
      required: true,
      default: () => []
    },
    initialTableData: {
      type: Array,
      required: false,
      default: () => []
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
  created () {
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
    deleteItem (item) {
      const index = this.tableData.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.tableData.splice(index, 1)
      // axios.delete(`${this.endpoint}/${item.id}`)
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
