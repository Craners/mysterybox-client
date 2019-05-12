import React, { Component } from 'react'
import { TextField, Layout, Button, DataTable } from '@shopify/polaris'
import './ResourceListItem.css'
import getSymbolFromCurrency from 'currency-symbol-map'
let _ = require('lodash')
const got = require('got')

export default class Selected extends Component {
  shop = ''
  api_url = ''

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

  //TODO: Move this to App.js. Then pass the data to components as needed.
  async componentDidMount() {
    this.api_url = process.env.REACT_APP_API_URL || 'http://localhost:3000'
    this.shop = process.env.REACT_APP_SHOP
  }

  handleChange = (value, id) => {
    this.setState({ [id]: value })
  }

  buildBody = (products, title, total) => {
    let productsArr = []
    if (products.length > 0) {
      products.forEach((item) => {
        productsArr.push({ id: item.id })
      })
    }

    let body = {}
    body = {
      customCollection: {
        title: title,
        published: false,
        image: {
          src: 'https://placeimg.com/300/300/tech',
          alt: 'https://placeimg.com/300/300/tech',
        },
      },
      products: productsArr,
      resultProduct: {
        title: 'MysteryBox',
        body_html: 'Default Description of MysteryBox',
        image: 'https://placeimg.com/300/300/tech',
        variants: [
          {
            option1: 'option1',
            price: total,
            sku: 'sku',
          },
        ],
      },
    }
    return body
  }

  async callApi(body) {
    // let jsonBody = JSON.stringify(body)
    let options = {
      method: 'POST',
      body: body,
      headers: {
        'cache-control': 'no-cache',
      },
      json: true,
    }
    console.log(`${this.api_url}/?shop=${this.shop}`);
    
    return await got.post(`${this.api_url}/?shop=${this.shop}`, options)
  }

  async createBox(props, title, total) {
    if (props.length > 0) {
      let body = this.buildBody(props, title, total)
      let result = await this.callApi(body)
      console.log(result)
      console.log(result.statusCode)
      console.log(result.body)
    } else {
      console.log('Add a Product to the list first')
    }
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
          <Button
            fullWidth
            primary
            onClick={() => this.createBox(onAction, this.state.titletxt, this.state.pricetxt)}
          >
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
