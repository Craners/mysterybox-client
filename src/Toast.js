import React, { Component } from "react";
import { Toast, Button, Frame, Page } from '@shopify/polaris'

export default class ToastComponent extends Component {
    state = {
        showToast: true,
    };

    render() {
        const { showToast } = this.state;
        const toastMarkup = showToast ? (
            <Toast content={this.props.message} onDismiss={this.toggleToast} duration={4500} />
        ) : null;


        return (
            <div style={{ height: '0px' }}>
                <Frame>
                    {toastMarkup}
                </Frame>
            </div>
        );
    }

    toggleToast = () => {
        this.setState(({ showToast }) => ({ showToast: !showToast }));
    };
}