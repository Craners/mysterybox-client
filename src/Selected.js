import React, { Component } from 'react'
import { TextField, Layout, ResourceList, Avatar, TextStyle } from '@shopify/polaris'
import './ResourceListItem.css'

export default class Selected extends Component {
  state = {
    pricetxt: '200',
    titletxt: 'Boxi',
  }
  handleChange = (value, id) => {
    this.setState({ [id]: value })
  }
  render() {
    return (
      <Layout>
        <Layout.Section oneThird>
          <TextField
            label="Title"
            id="titletxt"
            value={this.state.titletxt}
            onChange={this.handleChange}
          />
        </Layout.Section>
        <Layout.Section oneThird>
          <TextField
            label="Sales price"
            id="pricetxt"
            type="number"
            prefix="€"
            value={this.state.pricetxt}
            onChange={this.handleChange}
          />
        </Layout.Section>
        <Layout.Section>
          <ResourceList
            resourceName={{ singular: 'customer', plural: 'customers' }}
            items={[
              {
                id: 341,
                url: 'customers/341',
                name: 'Mae Jemison',
                location: 'Decatur, USA',
                latestOrderUrl: 'orders/1456',
              },
              {
                id: 256,
                url: 'customers/256',
                name: 'Ellen Ochoa',
                location: 'Los Angeles, USA',
                latestOrderUrl: 'orders/1457',
              },
            ]}
            renderItem={(item) => {
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
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div>{location}</div>
                </ResourceList.Item>
              )
            }}
          />
        </Layout.Section>
      </Layout>
    )
  }
}
