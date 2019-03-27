import React, { Component } from 'react'
import {
  TextStyle,
  Avatar,
  FilterType,
  Card,
  ResourceList,
  Scrollable,
  Spinner,
} from '@shopify/polaris'
import './ResourceListItem.css'

export default class ResourceListItem extends Component {
  state = {
    selectedItems: [],
    sortValue: 'DATE_MODIFIED_DESC',
    searchValue: '',
    appliedFilters: [
      {
        key: 'accountStatusFilter',
        value: 'Account enabled',
      },
    ],
    allMemeImgs: [],
    spin: null,
  }

  componentDidMount() {
    fetch('https://be.serveo.net/product/?shop=golden-crane.myshopify.com')
      .then((response) => response.json())
      .then((response) => {
        const { products } = response
        // console.log(products[0])
        var x = this.mapping(products)
        if (x.length > 0) {
          this.setState({ allMemeImgs: x, spin: true })
        } else {
          this.setState({ allMemeImgs: [], spin: false })
        }
      })
  }
  mapping = (products) => {
    var x = products.map((item) => {
      return {
        name: item.title,
        id: item.id,
        location: item.body_html,
      }
    })
    return x
  }
  handleSearchChange = (searchValue) => {
    this.setState({ searchValue })
  }
  handleFiltersChange = (appliedFilters) => {
    this.setState({ appliedFilters })
  }
  handleSortChange = (sortValue) => {
    this.setState({ sortValue })
  }
  handleSelectionChange = (selectedItems) => {
    this.setState({ selectedItems })
  }
  renderItem = (item) => {
    const { id, url, name, location, latestOrderUrl } = item
    const media = <Avatar customer size="medium" name={name} />
    const shortcutActions = latestOrderUrl
      ? [{ content: 'View latest order', url: latestOrderUrl }]
      : null
    return (
      <ResourceList.Item
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceList.Item>
    )
  }
  render() {
    const resourceName = {
      singular: 'product',
      plural: 'products',
    }
    const promotedBulkActions = [
      {
        content: 'Edit customers',
        onAction: () => console.log('Todo: implement bulk edit'),
      },
    ]
    const bulkActions = [
      {
        content: 'Add tags',
        onAction: () => console.log('Todo: implement bulk add tags'),
      },
      {
        content: 'Remove tags',
        onAction: () => console.log('Todo: implement bulk remove tags'),
      },
      {
        content: 'Delete customers',
        onAction: () => console.log('Todo: implement bulk delete'),
      },
    ]
    const filters = [
      {
        key: 'orderCountFilter',
        label: 'Number of orders',
        operatorText: 'is greater than',
        type: FilterType.TextField,
      },
      {
        key: 'accountStatusFilter',
        label: 'Account status',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
      },
    ]
    const filterControl = (
      <ResourceList.FilterControl
        filters={filters}
        appliedFilters={this.state.appliedFilters}
        onFiltersChange={this.handleFiltersChange}
        searchValue={this.state.searchValue}
        onSearchChange={this.handleSearchChange}
        additionalAction={{
          content: 'Save',
          onAction: () => console.log('New filter saved'),
        }}
      />
    )
    return (
      <div className="marginsClass">
        {this.state.spin ? (
          <Card>
            <Scrollable shadow style={{ height: '450px' }}>
              <ResourceList
                resourceName={resourceName}
                items={this.state.allMemeImgs}
                renderItem={this.renderItem}
                selectedItems={this.state.selectedItems}
                onSelectionChange={this.handleSelectionChange}
                promotedBulkActions={promotedBulkActions}
                bulkActions={bulkActions}
                sortValue={this.state.sortValue}
                sortOptions={[
                  { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
                  { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
                ]}
                onSortChange={(selected) => {
                  this.setState({ sortValue: selected })
                  console.log(`Sort option changed to ${selected}.`)
                }}
                filterControl={filterControl}
              />
            </Scrollable>
          </Card>
        ) : (
          <Spinner size="large" color="teal" />
        )}
      </div>
    )
  }
}
