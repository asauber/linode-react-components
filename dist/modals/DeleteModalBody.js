'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DeleteModalBody;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _groupBy = require('lodash/groupBy');

var _groupBy2 = _interopRequireDefault(_groupBy);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _capitalize = require('lodash/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _FormModalBody = require('./FormModalBody');

var _FormModalBody2 = _interopRequireDefault(_FormModalBody);

var _lists = require('../lists');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeleteModalBody(props) {
  var onSubmit = props.onSubmit,
      items = props.items,
      onCancel = props.onCancel,
      typeOfItem = props.typeOfItem,
      deleteAction = props.deleteAction,
      deleteActionPending = props.deleteActionPending;


  var groupedItems = (0, _groupBy2.default)(items);
  var groupedDOMItems = (0, _map2.default)(groupedItems, function (items, label) {
    if (items.length > 1) {
      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'strong',
          null,
          label
        ),
        ' (x',
        items.length,
        ')'
      );
    }

    return _react2.default.createElement(
      'strong',
      null,
      label
    );
  });

  var body = void 0;
  if (groupedDOMItems.length > 1) {
    body = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        'Are you sure you want to ',
        _react2.default.createElement(
          'strong',
          null,
          'permanently'
        ),
        ' ',
        deleteAction,
        ' these ',
        items.length,
        ' ',
        typeOfItem,
        '?'
      ),
      _react2.default.createElement(_lists.ScrollingList, { items: groupedDOMItems }),
      _react2.default.createElement(
        'p',
        null,
        'This operation cannot be undone.'
      )
    );
  } else {
    var domItem = groupedDOMItems[0];
    domItem = _react2.default.isValidElement(domItem) ? domItem : _react2.default.createElement(
      'strong',
      null,
      domItem
    );

    body = _react2.default.createElement(
      'p',
      null,
      'Are you sure you want to ',
      _react2.default.createElement(
        'strong',
        null,
        'permanently'
      ),
      ' ',
      deleteAction,
      ' ',
      domItem,
      '?'
    );
  }

  var title = 'Delete ' + typeOfItem;
  var analytics = { title: title, action: 'delete' };

  return _react2.default.createElement(
    _FormModalBody2.default,
    {
      className: 'DeleteModalBody',
      buttonText: (0, _capitalize2.default)(deleteAction),
      buttonDisabledText: (0, _capitalize2.default)(deleteActionPending),
      onSubmit: onSubmit,
      onCancel: onCancel,
      analytics: analytics
    },
    body
  );
}

DeleteModalBody.propTypes = {
  onSubmit: _propTypes2.default.func,
  items: _propTypes2.default.arrayOf(_propTypes2.default.node),
  onCancel: _propTypes2.default.func,
  typeOfItem: _propTypes2.default.string.isRequired,
  deleteAction: _propTypes2.default.string.isRequired,
  deleteActionPending: _propTypes2.default.string.isRequired
};

DeleteModalBody.defaultProps = {
  deleteAction: 'delete',
  deleteActionPending: 'deleting'
};