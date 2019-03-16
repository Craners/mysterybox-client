import React, { Component } from 'react'
import { Popover, Button, ActionList } from '@shopify/polaris'
import './ActionListComp.css';

class ActionListComp extends Component {
  state = {
    active: false,
  }

  togglePopover = () => {
    this.setState(({ active }) => {
      return { active: !active }
    })
  }

  render() {
    const activator = <Button onClick={this.togglePopover}>Sort Products</Button>

    return (
      <div className="marginActionList">
        <Popover active={this.state.active} activator={activator} onClose={this.togglePopover}>
          <ActionList
            items={[
              { content: 'Hight to Low', icon: 'import' },
              { content: 'Low to High', icon: 'export' },
            ]}
          />
        </Popover>
      </div>
    )
  }
}
export default ActionListComp
