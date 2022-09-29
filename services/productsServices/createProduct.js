export default function (fetchService) {
  return {
    createProduct: async productData => {
      const { success } = await fetchService.$post('api/products', productData)
      return success
    }
  }
}
/**/
