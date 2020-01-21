import React from 'react'
import { sprintf } from 'sprintf-js'
import {
    useFetchList,
    useFilterActions,
    useDelete
} from '../../../hooks'
import { tagsListFetch, tagsDeleteAction } from '../actions/tags'
import * as stateNames from '../../../constants/stateNames'
import Layout from '../../../components/Layouts/Layout'
import TagsList from '../components/Tags/TagsList'
import { DEFAULT_PICK_PARAMS } from 'utils/isEquals'
import * as ROUTES from '../../../constants/routes'

const fields = [

]
const PICK_PARAMS = [
    ...DEFAULT_PICK_PARAMS,
    'status',
    'client'
]
const TagsListContainer = props => {
    const data = useFetchList({
        action: tagsListFetch,
        stateName: stateNames.TAGS_LIST,
        pickParams: PICK_PARAMS
    })

    const deleteData = useDelete({
        stateName: stateNames.TAGS_DELETE,
        action: tagsDeleteAction,
        successAction: tagsListFetch
    })

    const filterAction = useFilterActions({ fields })

    const onEdit = (id) => props.history.push(sprintf(ROUTES.TAGS_UPDATE_URL, id))
    return (
        <Layout>
            <TagsList
                data={data}
                filterAction={filterAction}
                onEdit={onEdit}
                deleteData={deleteData}
            />
        </Layout>
    )
}

export default TagsListContainer
