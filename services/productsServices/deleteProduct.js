export default function (fetchService) {
  return {
    deleteProduct: async productId => {
      const { success } = await fetchService.$delete(`api/products/${productId}`)
      return success
    }
  }
}
