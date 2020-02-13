import {useTypedSelector} from 'etc/reducers'
import {getDataFromState} from "utils/getTyped";
import * as STATE from "constants/stateNames";
import {flatten, map, path, pathOr, pipe, prop} from "ramda";
import {TPermissionItem} from "types";
import {TUserInfo} from "types/models";


const getCodeNames = pipe(
  path<TPermissionItem[]>(['permissions']),
  map(prop('codename')),
)
const EMPTY_ARR = []
const useUserPerms = () => {

  const user = useTypedSelector(state => getDataFromState(STATE.USER_INFO, state))

  const userInfo = path<TUserInfo>(['data'], user)
  const permissionList = pipe(
    pathOr(EMPTY_ARR, ['data', 'position', 'groups']),
    map(getCodeNames),
    flatten
  )(user)


  return [permissionList, userInfo.isSuperuser]
}

export default useUserPerms
