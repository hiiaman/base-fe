import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import nl2br from 'react-newline-to-break';

const Alert = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  margin-top: 10px;
`;

class AlertError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }

  componentDidMount() {
    if (this.props.timeDuration) {
      setTimeout(() => {
        this.setState({
          show: false
        });
      }, this.props.timeDuration);
    }
  }

  render() {
    const { type, message } = this.props;
    const { show } = this.state;
    return (
      show &&
      <Alert className={type}>
        {nl2br(message)}
      </Alert>
    );
  }
}

AlertError.defaultProps = {
  type: 'alert-danger'
};

AlertError.propTypes = {
  message: PropTypes.string.isRequired
};

export default AlertError;
