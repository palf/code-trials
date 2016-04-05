var BillSectionMixin = {
  render: function () {
    var billNodes = this.createRows();
    return (
      <div>
        <h3>{this.props.sectionTitle}</h3>
        <table className="bill-section table table-striped">
          <tbody>
            {billNodes}
          </tbody>
          <tfoot>
            <BillItemTotal value={this.props.data.total}/>
          </tfoot>
        </table>
      </div>
    );
  }
};

function createBillItem(name, description, value) {
  return (
    <BillItem
      title={name}
      description={description}
      value={value}
    />
  )
}

var SubscriptionsSection = React.createClass({
  mixins: [BillSectionMixin],
  getDefaultProps: function () {
    return {
      sectionTitle: 'Subscriptions',
      data: {
        subscriptions: []
      }
    };
  },
  createRows: function () {
    return (this.props.data.subscriptions || []).map(function (item) {
      return createBillItem(camelcase(item.type), item.name, item.cost)
    });
  }
});

var CallChargesSection = React.createClass({
  mixins: [BillSectionMixin],
  getDefaultProps: function () {
    return {
      sectionTitle: 'Call Charges',
      data: {
        calls: []
      }
    };
  },
  createRows: function () {
    return (this.props.data.calls || []).map(function (item) {
      return createBillItem(item.called, item.duration, item.cost);
    });
  }
});


function createRentalItem(item) {
  return createBillItem('Rental', item.title, item.cost);
};

function createPurchaseItem(item) {
  return createBillItem('Purchase', item.title, item.cost);
};

var StoreSection = React.createClass({
  mixins: [BillSectionMixin],
  getDefaultProps: function () {
    return {
      sectionTitle: 'Store Purchases',
      data: {
        rentals: [],
        buyAndKeep: []
      }
    };
  },
  createRows: function () {
    var rentals = (this.props.data.rentals || []).map(createRentalItem);
    var purchases = (this.props.data.buyAndKeep || []).map(createPurchaseItem);
    return rentals.concat(purchases);
  }
});

