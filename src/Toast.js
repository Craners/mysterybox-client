import React, { Component } from "react";
import { Toast, Button, Frame, Page } from '@shopify/polaris'

export default class ToastComponent extends Component {
    state = {
        showToast: true,
    };

    render() {
        const { showToast } = this.state;
        const toastMarkup = showToast ? (
            <Toast content="Message sent" onDismiss={this.toggleToast} duration={4500} />
        ) : null;


        return (
            <div style={{ height: '0px' }}>
                <Frame>
                    {/* <Page title="Toast example"> */}
                    {/* <Button onClick={this.toggleToast}>Show Toast</Button> */}
                    {toastMarkup}
                    {/* </Page> */}
                </Frame>
            </div>
        );
    }

    toggleToast = () => {
        this.setState(({ showToast }) => ({ showToast: !showToast }));
    };
}