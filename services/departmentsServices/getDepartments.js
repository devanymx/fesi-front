export default function (fetchService) {
  return {
    getDepartments: async () => {
      const { data } = await fetchService.$get('api/departments')
      return data
    }
  }
}
