import React from 'react'
import { prop } from 'ramda'
import TagsUpdate from '../../components/Tags/TagsUpdate'
import { tagsItemFetch, tagsUpdateAction } from '../../actions/tags'
import { useFetchItem, useUpdate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import Layout from '../../../../components/Layouts/Layout'
import * as ROUTES from '../../../../constants/routes'
import { getIdForInitValues } from '../../../../utils/get'

const TagsUpdateContainer = () => {
  const tagsItem = useFetchItem({
    action: tagsItemFetch,
    stateName: stateNames.TAGS_ITEM
  })

  const update = useUpdate({
    action: tagsUpdateAction,
    stateName: stateNames.TAGS_UPDATE,
    redirectUrl: ROUTES.TAGS_LIST_PATH,
  })

  const data = prop('data', tagsItem)
  const initialValues = {
    ...data,
    ...getIdForInitValues(data, ['id'])
  }

  return (
    <Layout>
      <TagsUpdate {...update} initialValues={initialValues} />
    </Layout>
  )
}

export default TagsUpdateContainer
