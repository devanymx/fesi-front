export default function (fetchService) {
  return {
    deleteWarehouse: async warehouseId => {
      const { success } = await fetchService.$delete(`api/warehouse/${warehouseId}`)
      return success
    }
  }
}
