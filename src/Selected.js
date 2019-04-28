import React, { Component } from 'react'
import { TextField, Layout, Button, DataTable } from '@shopify/polaris'
import './ResourceListItem.css'
import getSymbolFromCurrency from 'currency-symbol-map'
let _ = require('lodash')

export default class Selected extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pricetxt: '200',
      titletxt: 'Boxi',
      shopInfo: {},
    }
  }

  componentDidUpdate() {
    if (_.isEmpty(this.state.shopInfo)) {
      this.setState({ shopInfo: this.props.shopInfo })
    }
  }

  handleChange = (value, id) => {
    this.setState({ [id]: value })
  }

  render() {
    let onAction = this.props.OnProductsAdded

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
            prefix={getSymbolFromCurrency(this.state.shopInfo.currency)}
            value={this.state.pricetxt}
            onChange={this.handleChange}
          />
        </Layout.Section>
        <Layout.Section>
          <DataTables
            data={onAction}
            prefix={getSymbolFromCurrency(this.state.shopInfo.currency)}
          />
        </Layout.Section>
        <Layout.Section>
          <Button fullWidth primary>
            Generate
          </Button>
        </Layout.Section>
      </Layout>
    )
  }
}

function DataTables(props) {
  const rows = []
  let totalPrice = 0
  let totalquantity = 0

  props.data.forEach((item) => {
    let { name, price, id, quantity } = item
    totalquantity = Number(totalquantity) + quantity
    totalPrice = Number(totalPrice) + Number(price)
    price = props.prefix + ' ' + price
    rows.push(Object.values({ name, id, quantity, price }))
  })
  totalPrice = props.prefix + ' ' + totalPrice
  return (
    <DataTable
      columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
      headings={['Product', 'SKU Number', 'Quantity', 'Price']}
      rows={rows}
      totals={['', '', totalquantity, `${totalPrice}`]} // currency should be added here for total, but can't access 'state' here.
    />
  )
}
