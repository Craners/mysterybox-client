import React, { Component } from 'react'
import { Layout, Page, Card } from '@shopify/polaris'
import './App.css'
import ResourceListItem from './ResourceListItem'

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
    console.log(products)
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
        </Layout>
      </Page>
    )
  }
}

export default App
