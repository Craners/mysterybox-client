import React, { Component } from 'react'
import { Layout, Page, Card, FooterHelp, Link } from '@shopify/polaris'
import './App.css'
import ResourceListItem from './ResourceListItem'
import Selected from './Selected'
require('dotenv').config();

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
    }
  }

  handleProductsAddded = (products) => {
    this.setState({ products: products })
  }

  render() {
    const breadcrumbs = [{ content: 'Sample apps' }, { content: 'Return to dashboard' }]
    // const primaryAction = { content: 'New product' }
    // const secondaryActions = [{ content: 'Import', icon: 'import' }]

    return (
      <Page title="Create Mystery Box" breadcrumbs={breadcrumbs}>
        <Layout>
          <Layout.Section>
            <Card title="Online store dashboard" sectioned>
              <p>View a summary of your online store’s performance.</p>
              <ResourceListItem OnProductsAdded={this.handleProductsAddded} />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Selected OnProductsAdded={this.state.products}/>
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
