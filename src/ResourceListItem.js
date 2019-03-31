import React, { Component } from 'react'
import { TextStyle, Avatar, FilterType, ResourceList, Scrollable } from '@shopify/polaris'
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
    allProducts: [],
    filteredProducts: [],
    spin: null,
  }

  componentDidMount() {
    fetch('http://localhost:3000/product/?shop=golden-crane.myshopify.com')
      .then((response) => response.json())
      .then((response) => {
        const { products } = response
        var x = this.mapping(products)
        if (x.length > 0) {
          this.setState({ allProducts: x, spin: true })
        } else {
          this.setState({ allProducts: [], spin: false })
        }
        this.setState({ filteredProducts: this.state.allProducts })
      })
  }
  mapping = (products) => {
    var x = products.map((item) => {
      return {
        name: item.title,
        id: item.id,
        description: item.body_html,
        avatar: item.image != null ? item.image.src : null,
        price: item.variants != null ? item.variants[0].price : null,
        // price: item.variants != null && item.variants[0].presentment_prices != null ? item.variants[0].presentment_prices[0].price.amount : null,
        // currency: item.variants != null && item.variants[0].presentment_prices != null ? item.variants[0].presentment_prices[0].price.currency_code : null
      }
    })
    return x
  }
  handleSearchChange = (searchValue) => {
    var filteredProducts = this.state.allProducts.filter((product) => {
      return product.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    })

    this.setState({ searchValue })
    this.setState({ filteredProducts })
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
  handleSelectionItemChange = (selectedItem) => {
    let selectedItems = this.state.selectedItems

    var item = selectedItems.indexOf(selectedItem)

    if (item !== -1) {
      selectedItems.splice(item, 1)
    } else {
      selectedItems.push(selectedItem)
    }

    this.setState({ selectedItems })
  }

  handleSelectedItemsForParent = () => {
    return this.state.allProducts.filter((product) => {
      return this.state.selectedItems.indexOf(product.id) !== -1
    })
  }
  renderItem = (item) => {
    const { id, url, name, description, latestOrderUrl, avatar } = item
    const media = <Avatar customer size="medium" name={name} source={avatar} />
    const shortcutActions = latestOrderUrl
      ? [{ content: 'View latest order', url: latestOrderUrl }]
      : null
    return (
      <ResourceList.Item
        id={id}
        // url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
        onClick={(item) => this.handleSelectionItemChange(item)}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{description}</div>
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
        content: 'Add product',
        onAction: () => this.props.OnProductsAdded(this.handleSelectedItemsForParent()),
      },
    ]
    // const bulkActions = [
    //   {
    //     content: 'Add tags',
    //     onAction: () => console.log('Todo: implement bulk add tags'),
    //   },
    //   {
    //     content: 'Remove tags',
    //     onAction: () => console.log('Todo: implement bulk remove tags'),
    //   },
    //   {
    //     content: 'Delete customers',
    //     onAction: () => console.log('Todo: implement bulk delete'),
    //   },
    // ]
    // const filters = [
    //   {
    //     key: 'orderCountFilter',
    //     label: 'Number of orders',
    //     operatorText: 'is greater than',
    //     type: FilterType.TextField,
    //   },
    //   {
    //     key: 'accountStatusFilter',
    //     label: 'Account status',
    //     operatorText: 'is',
    //     type: FilterType.Select,
    //     options: ['Enabled', 'Invited', 'Not invited', 'Declined'],
    //   },
    // ]
    const filterControl = (
      <ResourceList.FilterControl
        // filters={filters}
        // appliedFilters={this.state.appliedFilters}
        onFiltersChange={this.handleFiltersChange}
        searchValue={this.state.searchValue}
        onSearchChange={this.handleSearchChange}
        // additionalAction={{
        //   content: 'Search',
        //   onAction: () => console.log(this.state.searchValue),
        // }}
      />
    )
    return (
      <div className="marginsClass">
        {
          <Scrollable shadow style={{ height: '450px' }}>
            <ResourceList
              resourceName={resourceName}
              items={this.state.filteredProducts}
              renderItem={this.renderItem}
              selectedItems={this.state.selectedItems}
              onSelectionChange={this.handleSelectionChange}
              promotedBulkActions={promotedBulkActions}
              // bulkActions={bulkActions}
              // sortValue={this.state.sortValue}
              // sortOptions={[
              //   { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
              //   { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
              // ]}
              // onSortChange={(selected) => {
              //   this.setState({ sortValue: selected })
              //   console.log(`Sort option changed to ${selected}.`)
              // }}
              filterControl={filterControl}
              loading={!this.state.spin}
            />
          </Scrollable>
        }
      </div>
    )
  }
}
