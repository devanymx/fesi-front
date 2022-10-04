export default function (fetchService) {
  return {
    mutateDepartment: async (departmentId, departmentData) => {
      const { success } = await fetchService.$put(`api/departments/${departmentId}`, { ...departmentData })
      return success
    }
  }
}
