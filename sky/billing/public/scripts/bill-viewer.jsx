var emptyData = {
  "statement": {
    "generated": "2015-01-11",
    "due": "2015-01-25",
    "period": {
      "from": "2015-01-26",
      "to": "2015-02-25"
    }
  },
};

var Bill = React.createClass({
  getInitialState: function () {
    return { data: emptyData };
  },
  loadBill: function () {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function () {
    this.loadBill();
  },
  render: function () {
    return (
      <div className="bill">
        <h1>Your Sky Bill</h1>
        <BillMetadata statement={this.state.data.statement} total={this.state.data.total} />
        <BillBreakdown data={this.state.data} />
      </div>
    );
  }
});

var BillMetadata = React.createClass({
  render: function () {
    return (
      <div className="bill-metadata">
        <h2>Total: {formatAsMoney(this.props.total)}</h2>
        <h2>Due: {this.props.statement.due}</h2>
        <div>
          <h2>Period:</h2>
          <h4>From: {this.props.statement.period.from}</h4>
          <h4>To: {this.props.statement.period.to}</h4>
        </div>
      </div>
    );
  }
});

var BillBreakdown = React.createClass({
  render: function () {
    return (
      <div className="bill-breakdown">
        <SubscriptionsSection data={this.props.data.package} />
        <StoreSection data={this.props.data.skyStore} />
        <CallChargesSection data={this.props.data.callCharges} />
      </div>
    );
  }
});

React.render(
  <Bill url="bill.json" />,
  document.getElementById("content")
);
