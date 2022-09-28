<template>
  <b-container class="w-25 full-height flex">
    <div class="w-100 h-100">
      <h2>Inicio de Session</h2>
      <b-form v-if="show" @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Ingresa tu correo:"
          label-for="input-1"
          description="Nunca compartiremos su correo electrónico con nadie más."
        >
          <b-form-input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Ingresa tu correo"
            required
          />
        </b-form-group>

        <b-form-group id="input-group-2" label="Contraseña" label-for="input-2">
          <b-form-input
            id="password"
            v-model="form.password"
            type="password"
            required
          />
        </b-form-group>
        <b-button type="Ingresar" variant="primary">
          Entrar
        </b-button>
      </b-form>
    </div>
    <b-modal ref="errorLogin" hide-footer hide-header style="border-radius: 15px;" class="m-0 p-0">
      <div class="d-block text-center">
        <b-row>
          <b-col md="12">
            <div class="text-center text-secondary Montserrat fs-md-15 fw-80 p-top-90">
              <p class="text-uppercase p-top-50">
                ¡No se pudo iniciar sesion correctamente!
                <span class="d-block">
                  Error: {{ errorCode }}
                </span>
                <span class="d-block">
                  {{ error }}
                </span>
              </p>
            </div>
            <div>
              <div class="w-100 d-flex justify-content-center m-top-md-20">
                <b-button
                  variant="outline-secondary"
                  class="fs-md-12 rounded-pill pt-0 pb-0 m-2 p-left-10 p-right-10 Montserrat"
                  @click="hideModal('errorLogin')">
                  Aceptar
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'LoginForm',
  layout: 'login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: '',
      errorCode: '',
      show: true
    }
  },
  methods: {
    async onSubmit (event) {
      event.preventDefault()
      await this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.form.email,
          password: this.form.password
        }
      })
    },
    hideModal (modal) {
      this.$refs[modal].hide()
    },
    onReset (event) {
      event.preventDefault()
      this.form.email = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
