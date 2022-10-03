export default function (fetchService) {
  return {
    createWarehouse: async warehouse => {
      const { success } = await fetchService.$post('api/warehouse', warehouse)
      return success
    }
  }
}
