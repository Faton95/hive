import React from 'react'
import TagsCreate from '../../components/Tags/TagsCreate'
import { tagsCreateAction } from '../../actions/tags'
import { createSerializer } from '../../serializers/tagsSerializer'
import { useCreate } from '../../../../hooks'
import * as stateNames from '../../../../constants/stateNames'
import * as ROUTES from '../../../../constants/routes'
import Layout from '../../../../components/Layouts/Layout'

const TagsDetailContainer = props => {
  const data = useCreate({
    stateName: stateNames.TAGS_CREATE,
    action: tagsCreateAction,
    redirectUrl: ROUTES.TAGS_LIST_PATH,
    serializer: createSerializer
  })
  return (
    <Layout>
      <TagsCreate {...data} />
    </Layout>
  )
}
export default TagsDetailContainer
