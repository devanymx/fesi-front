export default function (fetchService) {
  return {
    createDepartment: async department => {
      const { success } = await fetchService.$post('api/departments', department)
      return success
    }
  }
}
