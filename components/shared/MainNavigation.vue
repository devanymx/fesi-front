<template>
  <!-- eslint-disable-next-line vue/no-v-model-argument -->
  <a-menu mode="horizontal">
    <a-menu-item key="products">
      Productos
    </a-menu-item>
    <a-menu-item key="departments">
      Departamentos
    </a-menu-item>
    <a-menu-item key="warehouse">
      Almacén
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'MainNavigation'
}
</script>
