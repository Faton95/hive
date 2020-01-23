import ContractCreateContainer from './containers/ContractCreateContainer'
import * as ROUTES from "constants/routes"

export default (store) => [
  {
    exact: true,
    path: ROUTES.CONTRACT_CREATE_PATH,
    component: ContractCreateContainer
  }
]
