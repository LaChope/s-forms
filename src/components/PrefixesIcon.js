import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, OverlayTrigger, Popover } from 'react-bootstrap';
import Constants from '../constants/Constants';

class PrefixIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      prefixes: props.prefixes,
      iconClass: props.iconClass,
      glyph: props.glyph
    };
  }

  render() {
    const p = (
      <Popover id="prefixes" title="Prefixes">
        <ListGroup>
          {this.state.prefixes
            .sort((l, r) => {
              const res = l[Constants.PREFIX] < r[Constants.PREFIX];
              if (res) return -1;
              return 1;
            })
            .map((p) => (
              <ListGroupItem key={p[Constants.PREFIX]}>
                <strong>{p[Constants.PREFIX]}</strong>: {p[Constants.NAMESPACE]}
              </ListGroupItem>
            ))}
        </ListGroup>
      </Popover>
    );

    return (
      <OverlayTrigger trigger="click" placement="right" overlay={p}>
        <span
          className={`${this.state.glyph} ${this.state.iconClass}`}
          onClick={() => this.setState({ show: !this.state.show })}
        />
      </OverlayTrigger>
    );
  }
}

PrefixIcon.propTypes = {
  prefixes: PropTypes.array.isRequired,
  glyph: PropTypes.string,
  iconClass: PropTypes.string,
  show: PropTypes.bool
};

PrefixIcon.defaultProps = {
  iconClass: '',
  glyph: 'icon-info-circle',
  show: false
};

export default PrefixIcon;
