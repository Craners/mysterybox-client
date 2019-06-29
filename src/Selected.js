import React, { Component } from 'react'
import { TextField, Layout, Button, DataTable, Spinner } from '@shopify/polaris'
import './ResourceListItem.css'
import getSymbolFromCurrency from 'currency-symbol-map'
import ToastComponent from './Toast'
import { string } from 'prop-types';
let _ = require('lodash')
const got = require('got')

export default class Selected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_url: 'http://localhost:3000',
      pricetxt: '200',
      titletxt: 'Boxi',
      shopInfo: {},
      showToast: false,
      messageToast: "",
      disabledGenerateBtn: false,
      messageGenerateBtn: "Generate"
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
    this.setState({ api_url: process.env.REACT_APP_API_URL });
    this.shop = process.env.REACT_APP_SHOP

    const shopInfo = await this.getShopInfo(this.state.api_url, this.shop)
    this.setState({ shopInfo: shopInfo })
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

  //Here add to response 200
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
    console.log(`${this.state.api_url}/?shop=${this.shop}`);

    let res = await got.post(`${this.state.api_url}/?shop=${this.shop}`, options)
    console.log(res);

    return res;
  }

  async createBox(props, title, total) {
    if (props.length > 0) {
      this.setState({ showToast: false });
      this.setState({ messageGenerateBtn: <Spinner color="teal" size="small" /> })
      this.setState({ disabledGenerateBtn: true });
      let body = this.buildBody(props, title, total)
      let result = await this.callApi(body)
      let statusCode = result.body.statusCode;
      let error = result.body.error;

      this.setState({ disabledGenerateBtn: false });
      this.setState({ messageGenerateBtn: "Generate" })

      if (statusCode === 201) {
        this.setState({ messageToast: "Collection box created successfully." });
      }
      else {
        this.setState({ messageToast: `Collection box creation failed. Message: ${error}` });
      }
      this.setState({ showToast: true });
    } else {
      this.setState({ messageToast: "Add a Product to the list first" });
      this.setState({ showToast: true })
    }
  }

  render() {
    let onAction = this.props.OnProductsAdded;

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
            disabled={this.state.disabledGenerateBtn}
          >
            {this.state.messageGenerateBtn}
          </Button>
        </Layout.Section>
        {this.state.showToast ? <ToastComponent message={this.state.messageToast} /> : null}
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
    totalPrice = Number(totalPrice) + (Number(price) * quantity)
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
