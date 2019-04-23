import React, { Component } from 'react'
import {
  TextStyle,
  Avatar,
  ResourceList,
  Scrollable,
  Caption,
} from '@shopify/polaris'
import './ResourceListItem.css'
import getSymbolFromCurrency from 'currency-symbol-map'
require('dotenv').config()
let _ = require('lodash')

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
    shopInfo: {},
    allProducts: [],
    filteredProducts: [],
    spin: null,
  }

  getProducts = async (api_url, shop) => {
    await fetch(`${api_url}/product/?shop=${shop}`) //dynamic shop name
      .then((response) => response.json())
      .then((response) => {
        const { products } = response
        var x = this.mapProducts(products)
        if (x.length > 0) {
          this.setState({ allProducts: x, spin: true })
        } else {
          this.setState({ allProducts: [], spin: false })
        }
        this.setState({ filteredProducts: this.state.allProducts })
      })
      .catch(error => {
        console.log(error);
      })
  }

  //TODO: Move this to App.js. Then pass the data to components as needed.
  async componentDidMount() {
    let api_url = process.env.REACT_APP_API_URL || 'http://localhost:3000'
    const shop = 'golden-crane.myshopify.com';

    await this.getProducts(api_url, shop)
  }

  componentDidUpdate() {
    if (_.isEmpty(this.state.shopInfo)) {
      this.setState({ shopInfo: this.props.shopInfo })
    }
  }

  mapProducts = (products) => {
    var x = products.map((item) => {
      return {
        name: item.title,
        id: item.id,
        description: item.body_html,
        avatar: item.image != null ? item.image.src : null,
        price: item.variants != null ? item.variants[0].price : null,
        quantity: 1
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
    const { id, name, description, avatar, price } = item
    const media = <Avatar customer size="medium" name={name} source={avatar} />
    const shortcutActions = [
      // {
      //   content: (
      //     <TextField
      //       // id="quantitytxt"
      //       type="number"
      //       placeholder="Quantity"
      //       onChange={this.handleChange}
      //       value={this.state.quantitytxt}
      //       min='0'
      //     />
      //   ),
      // },
      { content: <Caption>{getSymbolFromCurrency(this.state.shopInfo.currency)} {price}</Caption> },
    ]
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
    const filterControl = (
      <ResourceList.FilterControl
        onFiltersChange={this.handleFiltersChange}
        searchValue={this.state.searchValue}
        onSearchChange={this.handleSearchChange}
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
              filterControl={filterControl}
              loading={!this.state.spin}
            />
          </Scrollable>
        }
      </div>
    )
  }
}
