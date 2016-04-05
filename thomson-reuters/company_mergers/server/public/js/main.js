requirejs.config({
  paths: {
    "jquery": "vendor/jquery"
  }
});

define (["jquery", 'actions', 'companyData'], function ($, actions, companyData) {
  var world = $('#world');

  function fetchClasses(company) { 
    var classes = [ 'company' ];
    if (company.isPublic) { classes.push('public'); }
    if (company.isBankrupt) { classes.push('bankrupt'); }
    return classes.join(' ');
  }

  Handlebars.registerHelper('company', function (options) {
    var classes = fetchClasses(options.data.root);
    return new Handlebars.SafeString(
      '<div class="' + classes + '">' + options.fn(this) + '</div>');
  });

  $.get('templates/company.html', function (data) {
    // remove this load function and use precompilation
    var template = Handlebars.compile(data);
    render(template, companyData);
    bindHandlers(function (companies) {
      // use _.partial instead
      render(template, companies);
    });
  }, 'html');

  function render(template, data) {
    world.html($.map(data, template).join(''));
  }

  function bindHandlers(renderCompanies) {
    $('#createCompanyBtn').click(function () {
      var name = $('#nameInput').val();
      companyData = actions.createPrivateCompany(companyData, name);
      renderCompanies(companyData);
    });

    $('#bankruptBtn').click(function () {
      companyData = actions.bankruptCompany(companyData);
      renderCompanies(companyData);
    });

    $('#addProductBtn').click(function () {
      companyData = actions.addProduct(companyData);
      renderCompanies(companyData);
    });

    $('#floatRandomBtn').click(function () {
      companyData = actions.floatPrivateCompany(companyData);
      renderCompanies(companyData);
    });

    $('#encourageMergersBtn').click(function () {
      companyData = actions.encourageMergers(companyData);
      renderCompanies(companyData);
    });

  }

});
