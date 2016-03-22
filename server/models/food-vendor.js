module.exports = function(FoodVendor) {
	FoodVendor.getByLocationType = function(keyword, cb) {
		var response;
		FoodVendor.find({ $text: { $search: keyword } }, function (err, vendors) {
			if (err) {
				console.log('oops!', err);
			} else {
				console.log('vendors!', vendors);
				response = vendors;
			}
			cb(null, response);
		});
	};
  FoodVendor.remoteMethod(
    'getByLocationType',
    {
      http: {path: '/bylocationtype', verb: 'get'},
      accepts: {arg: 'type', type: 'string', http: { source: 'query' } },
      returns: {arg: 'locations', type: 'array' }
    }
  );
};
