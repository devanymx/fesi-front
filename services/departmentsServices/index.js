import getDepartmentsHandler from './getDepartments'
import deleteDepartmentHandler from './deleteDepartment'

export const DepartmentsServices = fetchService => {
  return {
    getDepartments: getDepartmentsHandler(fetchService).getDepartments,
    deleteDepartment: deleteDepartmentHandler(fetchService).deleteDepartment
  }
}
