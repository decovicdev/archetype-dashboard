import { Component } from "react";
import classnames from "classnames";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: props.isVisible || false,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({ isVisible: true });

    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  hide() {
    this.setState({ isVisible: false });

    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <div
        className={classnames("modal-layer", this.props.className, {
          visible: this.state.isVisible,
        })}
      >
        <div className="modal-content">
          {this.props.title && <div className="tit">{this.props.title}</div>}
          {this.props.children}
          {!this.props.alwaysVisible && (
            <button type="button" className="close-btn" onClick={this.hide} />
          )}
          {this.props.isBusy ? (
            <div className="loading-bar">
              <div className="spinner" />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Modal;
