import React, { Component } from 'react'
import { Layout, Page, Card, FooterHelp, Link } from '@shopify/polaris'
import './App.css'
import ResourceListItem from './ResourceListItem'
import Selected from './Selected'
require('dotenv').config()
let _ = require('lodash')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first: '',
      last: '',
      email: '',
      checkboxes: [],
      connected: false,
      products: [],
      shopInfo: {}
    }
  }

  getShopInfo = async (api_url, shopDomain) => {
    try {
      const response = await fetch(`${api_url}/shop/?shop=${shopDomain}`)
      const json = await response.json();      
      const { shop } = json.body
      return shop
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    let api_url = process.env.REACT_APP_API_URL || 'http://localhost:3000'
    this.shop = process.env.REACT_APP_SHOP

    const shopInfo = await this.getShopInfo(api_url, this.shop)
    this.setState({ shopInfo: shopInfo })
  }

  handleProductsAddded = (newProds) => {
    this.setState((state) => {
      let newProducts = []
      let prevElementsNotInCurrentProducts = state.products.filter((product) => {
        return !_.find(newProds, { id: product.id })
      })

      newProducts.push(...prevElementsNotInCurrentProducts)

      newProds.forEach((product) => {
        if (!_.find(state.products, { id: product.id })) {
          newProducts.push(product)
        } else {
          let tempProd = product
          tempProd.quantity += 1
          newProducts.push(tempProd)
        }
      })

      let products = newProducts
      return { products }
    })
  }

  render() {
    const breadcrumbs = [{ content: 'Sample apps' }, { content: 'Return to dashboard' }]
    // const primaryAction = { content: 'New product' }
    // const secondaryActions = [{ content: 'Import', icon: 'import' }]

    return (
      <Page title="Create Mystery Box" breadcrumbs={breadcrumbs}>
        <Layout>
          <Layout.Section>
            <Card title="Mystery Box dashboard" sectioned>
              <p>Create your mystery box here.</p>
              <ResourceListItem OnProductsAdded={this.handleProductsAddded} shopInfo={this.state.shopInfo} />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Selected OnProductsAdded={this.state.products} shopInfo={this.state.shopInfo} />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <FooterHelp>
              Learn more about MysteryBox{' '}
              <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
                fulfilling orders
              </Link>
              .
            </FooterHelp>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

export default App
