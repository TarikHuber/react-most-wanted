import FilterDrawer from 'material-ui-shell/lib/components/FilterDrawer'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import SearchField from 'material-ui-shell/lib/components/SearchField'
import Toolbar from '@material-ui/core/Toolbar'
import VirtualList from 'material-ui-shell/lib/containers/VirtualList'
import { useFilter } from 'material-ui-shell/lib/providers/Filter'

export default function (props) {
  const {
    fields = [],
    list: source = [],
    getPageProps = () => {},
    listProps,
    Row,
    name,
    trailing = null,
    leading = null,
    disableSearch = false,
  } = props
  const { openFilter, getList, getFilter, setSearch } = useFilter()
  const { queries = [], search = {} } = getFilter(name)
  const { value: searchValue = '' } = search

  const list = getList(name, source, fields)

  return (
    <Page
      contentStyle={{ overflow: 'hidden' }}
      appBarContent={
        <Toolbar disableGutters>
          {leading}
          {!disableSearch && (
            <SearchField
              initialValue={searchValue}
              onChange={(v) => {
                setSearch(name, v)
              }}
            />
          )}
          {fields.length > 0 && (
            <IconButton color="inherit" onClick={() => openFilter(name)}>
              <FilterList
                color={queries.length > 0 ? 'secondary' : undefined}
              />
            </IconButton>
          )}
          {trailing}
        </Toolbar>
      }
      {...getPageProps(list)}
    >
      <VirtualList list={list} name={name} listProps={listProps} Row={Row} />

      {fields.length > 0 && <FilterDrawer fields={fields} name={name} />}
    </Page>
  )
}
