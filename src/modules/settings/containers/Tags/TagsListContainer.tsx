import React from 'react'
import { sprintf } from 'sprintf-js'
import {
  useFetchList,
  useDelete
} from '../../../../hooks'
import { tagsListFetch, tagsDeleteAction } from '../../actions/tags'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import TagsList from '../../components/Tags/TagsList'
import * as ROUTES from '../../../../constants/routes'

const TagsListContainer = props => {
  const data = useFetchList({
    action: tagsListFetch,
    stateName: stateNames.TAGS_LIST,
  })

  const deleteData = useDelete({
    stateName: stateNames.TAGS_DELETE,
    action: tagsDeleteAction,
    successAction: tagsListFetch
  })

  const onEdit = (id) => props.history.push(sprintf(ROUTES.TAGS_UPDATE_URL, id))
  return (
    <Layout>
      <TagsList
        data={data}
        onEdit={onEdit}
        deleteData={deleteData}
      />
    </Layout>
  )
}

export default TagsListContainer
