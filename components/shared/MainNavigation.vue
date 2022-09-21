<template>
  <!-- eslint-disable-next-line vue/no-v-model-argument -->
  <a-menu v-model:selectedKeys="current" mode="horizontal">
    <a-menu-item key="mail">
      <template #icon />
      Navigation One
    </a-menu-item>
    <a-menu-item key="app">
      <template #icon />
      Navigation Two
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'MainNavigation'
}
</script>
