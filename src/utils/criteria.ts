export const createReportsCriteria = (criteria: any) => {
  let newCriteria: any;
  Object.keys(criteria).map(key => {
    if (key === "search") {
      newCriteria = {
      "name": { "$regex": new RegExp(criteria.search || '', 'i') }
    }
    } else {
      newCriteria = {
        ...newCriteria,
        [key]: criteria[key]
      }
    }
  })
  return newCriteria;
}