import React, { Component } from 'react'
import { Layout, Page, Card, Heading } from '@shopify/polaris'
import MultiAutocompleteComp from './MultiAutocompleteComp'
import ActionListComp from './ActionListComp'
import './App.css'

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
      <Page
        title="Create Mystery Box"
        breadcrumbs={breadcrumbs}
        // primaryAction={primaryAction}
        // secondaryActions={secondaryActions}
      >
        <Layout>
          <Layout.Section>
            <Card title="Online store dashboard" sectioned>
              <p>View a summary of your online store’s performance.</p>
              <MultiAutocompleteComp />
              <ActionListComp />
              <Heading>Found XX results</Heading>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

export default App
