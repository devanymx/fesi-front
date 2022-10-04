export default function (fetchService) {
  return {
    getWarehouses: async () => {
      const { data } = await fetchService.$get('api/warehouse')
      return data
    }
  }
}
