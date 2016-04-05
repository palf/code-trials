function formatAsMoney(value) {
  if (value) {
    return parseFloat(value).toFixed(2);
  } else {
    return "0.00";
  }
}

var BillItem = React.createClass({
  render: function () {
    return (
      <tr className="bill-item">
        <td className="title">{this.props.title}</td>
        <td className="description">{this.props.description}</td>
        <td className="value">{formatAsMoney(this.props.value)}</td>
      </tr>
    );
  }
});

var BillItemTotal = React.createClass({
  render: function () {
    return (
      <tr className="bill-item total">
        <td className="title">Total</td>
        <td className="description"></td>
        <td className="value">{formatAsMoney(this.props.value)}</td>
      </tr>
    );
  }
});
