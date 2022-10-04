export default function (fetchService) {
  return {
    mutateProduct: async (productId, productData) => {
      const { success } = await fetchService.$put(`api/products/${productId}`, productData)
      return success
    }
  }
}
