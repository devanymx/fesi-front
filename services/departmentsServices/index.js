import getDepartmentsHandler from './getDepartments'
import deleteDepartmentHandler from './deleteDepartment'
import createDepartmentHandler from './createDepartment'
import mutateDepartmentHandler from './mutateDepartment'

export const DepartmentsServices = fetchService => {
  return {
    getDepartments: getDepartmentsHandler(fetchService).getDepartments,
    deleteDepartment: deleteDepartmentHandler(fetchService).deleteDepartment,
    createDepartment: createDepartmentHandler(fetchService).createDepartment,
    mutateDepartment: mutateDepartmentHandler(fetchService).mutateDepartment
  }
}
