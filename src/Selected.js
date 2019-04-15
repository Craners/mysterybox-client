import React, { Component } from 'react'
import { TextField, Layout, Button, DataTable } from '@shopify/polaris'
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
    let onAction = this.props.OnProductsAdded
    console.log(onAction)
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
          <DataTables data={onAction} />
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
    const { name, price, id } = item
    const quantity = 1
    totalquantity = Number(totalquantity) + 1
    totalPrice = Number(totalPrice) + Number(price)
    rows.push(Object.values({ name, id, quantity, price }))
  })
  console.log(rows)

  return (
    <DataTable
      columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
      headings={['Product', 'SKU Number', 'Quantity', 'Price']}
      rows={rows}
      totals={['', '', totalquantity, totalPrice]}
    />
  )
}
