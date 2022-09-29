<template>
  <div class="p-3">
    <b-nav>
      <b-nav-item>
        <NuxtLink to="/products" class="text-decoration-none text-dark">
          <fontawesome-icon class="mr-1" :icon="['fa', 'shapes']" />
          Productos
        </NuxtLink>
      </b-nav-item>
      <b-nav-item>
        <NuxtLink to="/departments" class="text-decoration-none text-dark">
          <fontawesome-icon class="mr-1" :icon="['fa', 'layer-group']" />
          Departamentos
        </NuxtLink>
      </b-nav-item>
      <b-nav-item>
        <NuxtLink to="/warehouse" class="text-decoration-none text-dark">
          <fontawesome-icon class="mr-1" :icon="['fa', 'warehouse']" />
          Almacén
        </NuxtLink>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: 'MainNavigation'
}
</script>
