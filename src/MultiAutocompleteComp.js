import React, { Component } from 'react'
import { Autocomplete, TextContainer, Stack, Tag } from '@shopify/polaris'
import './MultiAutocomplete.css';

class MultiAutocompleteComp extends Component {
  options = [
    { value: 'rustic', label: 'Rustic' },
    { value: 'antique', label: 'Antique' },
    { value: 'vinyl', label: 'Vinyl' },
    { value: 'vintage', label: 'Vintage' },
    { value: 'refurbished', label: 'Refurbished' },
  ]
  icons = [{ content: 'Import', icon: 'import' }]

  state = {
    selected: [],
    inputText: '',
    options: this.options,
  }
  render() {
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label=""
        value={this.state.inputText}
        placeholder="Vintage, cotton, summer"
      />
    )
    return (
      // <div style={{ height: '150px' }}>
      <div className="marginTopBut">
        <br />
        <Autocomplete
          allowMultiple
          options={this.state.options}
          selected={this.state.selected}
          textField={textField}
          onSelect={this.updateSelection}
          listTitle="Suggested Tags"
        />
        <br />
        <TextContainer>
          <Stack>{this.renderTags()}</Stack>
        </TextContainer>
      </div>
    )
  }

  updateText = (newValue) => {
    this.setState({ inputText: newValue })
    this.filterAndUpdateOptions(newValue)
  }

  removeTag = (tag) => {
    let newSelected = this.state.selected
    newSelected.splice(newSelected.indexOf(tag), 1)
    this.setState({ selected: newSelected })
  }

  renderTags = () => {
    return this.state.selected.map((option) => {
      let tagLabel = ''
      tagLabel = option.replace('_', ' ')
      tagLabel = titleCase(tagLabel)
      return (
        <Tag key={'option' + option} onRemove={() => this.removeTag(option)}>
          {tagLabel}
        </Tag>
      )
    })
  }

  filterAndUpdateOptions = (inputString) => {
    if (inputString === '') {
      this.setState({
        options: this.options,
      })
      return
    }

    const filterRegex = new RegExp(inputString, 'i')
    const resultOptions = this.options.filter((option) => option.label.match(filterRegex))
    let endIndex = resultOptions.length - 1
    if (resultOptions.length === 0) {
      endIndex = 0
    }
    this.setState({
      options: resultOptions,
    })
  }
  updateSelection = (selected) => this.setState({ selected })
}
export default MultiAutocompleteComp

function titleCase(string) {
  string = string
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase())
    })
  return string.join(' ')
}
