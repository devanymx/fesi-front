<template>
  <div>
    <h2>Inicio de Sesion</h2>
    <img src="https://media.istockphoto.com/vectors/repair-icon-vector-id969856478?k=20&m=969856478&s=612x612&w=0&h=AreUmSVlPfcaQkp8si7l69hsGK7J_RXx1NWMShp1Uyw=" alt="Logotipo" width="200" height="200">
    <b-form v-if="show" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Ingresa tu correo:"
        label-for="input-1"
        description="Nunca compartiremos su correo electrónico con nadie más."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Ingresa tu correo"
          required
        />
      </b-form-group>

      <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="**************"
          required
        />
      </b-form-group>
      <b-button type="Ingresar" variant="primary">
        Entrar
      </b-button>
    </b-form>
    <b-button type="Registrar" variant="danger">
      Registrar
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        email: '',
        name: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}

</script>
