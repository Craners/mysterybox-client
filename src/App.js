import React, { Component } from 'react'
import { Layout, Page, Card } from '@shopify/polaris'
import './App.css'
import ResourceListItem from './ResourceListItem'
import Selected from './Selected'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first: '',
      last: '',
      email: '',
      checkboxes: [],
      connected: false,
    }
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
              <ResourceListItem />
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <Selected />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

export default App
