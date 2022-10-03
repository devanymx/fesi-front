export default function (fetchService) {
  return {
    getWarehouseProducts: async warehouseId => {
      const { data } = await fetchService.$get(`api/warehouse/${warehouseId}/inventory`)
      return data
    }
  }
}
