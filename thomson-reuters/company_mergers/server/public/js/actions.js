define('actions', function () {

	function createCompany(name) {
		return {
			name: name,
			isPublic: false,
			isBankrupt: false,
			assets: []
		};
	}

	function append (array, item) {
		var clone = array.slice(0);
		clone.push(item);
		return clone;
	}

	function each(array, func) {
		var i;
		for (i = 0; i < array.length; i++) {
			func(array[i], i);
		}
		return array;
	}

	function map (array, func) {
		var results = [];
		each(array, function (item, index) {
			results.push(func(item, index));
		});
		return results;
	}

	function filter (array, predicate) {
		var results = [];
		each(array, function (item, index) {
			if (predicate(item, index)) { results.push(item); }
		});
		return results;
	}

	function selectRandomIndex(array) {
		if (array.length === 0) {
			return -1;
		} else {
			return Math.floor(Math.random() * array.length);
		}
	}

	function selectRandomItem(array) {
		return array[selectRandomIndex(array)];
	}

	function isPrivateCompany(company) {
		return !company.isPublic;
	}

	function isBankrupt(company) {
		return company.isBankrupt;
	}

	function selectPrivateIndex(array) {
		// uncurry
		var indexes = map(array, function (item, index) { return { item: item, index: index }; });
		var notBankrupt = filter(indexes, function (data) { return !isBankrupt(data.item); });
		var privates = filter(notBankrupt, function (data) { return isPrivateCompany(data.item); });
		var randomItem = selectRandomItem(privates);
		if (!!randomItem) {
			return randomItem.index;
		} else {
			return -1;
		}
	}

	function operateInPlace(array, selector, func) {
		var index = selector(array);
		if (index < 0) {
			return array;
		} else {
			var head = array.slice(0, index);
			var item = func(array[index]);
			var tail = array.slice(index + 1, array.length);
			return head.concat(item).concat(tail);
		}
	}

	function makeBankrupt(company) {
		return $.extend(company, { isBankrupt: true });
	}

	function addRandomProduct(company) {
		var products = [ '01', '02', '03' ];
		var product = selectRandomItem(products);
		var assetsClone = append(company.assets, product);
		return $.extend(company, { assets: assetsClone });
	}

	function makePublic (company) {
		return $.extend(company, { isPublic: true });
	}

	// -------

	function createPrivateCompany (companies, name) {
		return append(companies, createCompany(name));
	}

	function bankruptCompany(companies) {
		return operateInPlace(companies, selectRandomIndex, makeBankrupt);
	}

	function addProduct(companies) {
		return operateInPlace(companies, selectPrivateIndex, addRandomProduct);
	}

	function floatPrivateCompany(companies) {
		return operateInPlace(companies, selectPrivateIndex, makePublic);
	}

	function encourageMergers(companies) {
		return companies;
	}

	return {
		createPrivateCompany: createPrivateCompany,
		bankruptCompany: bankruptCompany,
		addProduct: addProduct,
		floatPrivateCompany: floatPrivateCompany,
		encourageMergers: encourageMergers
	};

});
