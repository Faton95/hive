import TagsListContainer from './containers/TagsListContainer'
import * as ROUTES from "constants/routes";


export default (store) => [
  {
    exact: true,
    path: ROUTES.TAGS_LIST_PATH,
    component: TagsListContainer
  },

]
