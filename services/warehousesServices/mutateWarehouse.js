export default function (fetchService) {
  return {
    mutateWarehouse: async (warehouseId, warehouseData) => {
      const { success } = await fetchService.$put(`api/warehouse/${warehouseId}`, { ...warehouseData })
      return success
    }
  }
}
