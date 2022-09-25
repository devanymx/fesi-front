export default function (fetchService) {
  return {
    getProducts: async () => {
      const { data } = await fetchService.$get('/products')
      return data
    }
  }
}
