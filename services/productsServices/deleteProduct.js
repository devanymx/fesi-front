export default function (fetchService) {
  return {
    deleteProduct: async productId => {
      const { success } = await fetchService.$delete(`/products/${productId}`)
      return success
    }
  }
}
