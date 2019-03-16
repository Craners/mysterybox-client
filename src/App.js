import React, { Component } from 'react'
import { Layout, Page, Card } from '@shopify/polaris'
import MultiAutocomplete from './MultiAutocomplete'

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

    const choiceListItems = [
      { label: 'I accept the Terms of Service', value: 'false' },
      { label: 'I consent to receiving emails', value: 'false2' },
    ]

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
              <MultiAutocomplete />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

export default App
