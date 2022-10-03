export default function (fetchService) {
  return {
    addWarehouseProduct: async (warehouseId, productData) => {
      const { success } = await fetchService.$post(`api/warehouse/${warehouseId}/add`, { ...productData })
      return success
    }
  }
}
