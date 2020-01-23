import AssignmentCreateContainer from './containers/AssignmentCreateContainer'
import * as ROUTES from "constants/routes"

export default (store) => [
  {
    exact: true,
    path: ROUTES.ASSIGNMENT_LIST_PATH,
    component: AssignmentCreateContainer
  }
]
