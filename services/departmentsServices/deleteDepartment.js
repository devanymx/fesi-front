export default function (fetchService) {
  return {
    deleteDepartment: async departmentId => {
      const { success } = await fetchService.$delete(`api/departments/${departmentId}`)
      return success
    }
  }
}
