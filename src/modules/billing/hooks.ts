import {useCustomModal} from "hooks";
import {useHistory} from 'react-router-dom'
import {getParamFromHistory} from "utils/get";
import {UPDATE_MODAL} from "./containers/TimeSheetListContainer";
import {find, prop, propEq} from "ramda";

export const useUpdateTimeSheet = (list = []) => {
  const history = useHistory()
  const id = Number(getParamFromHistory(UPDATE_MODAL, history))
  const item = find(propEq('id', id), list)

  const updateModal = useCustomModal({
    key: UPDATE_MODAL,
  })

  const initialValues = {
    description: prop('description', item),
    assignment: prop('assignment', item),
    id: id
  }
  return {...updateModal, initialValues}
}
