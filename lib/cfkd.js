

(function() {
	 var fs = require('fs');
	 var path = require('path');
	 var util = require('util');
	 var ncp = require('ncp').ncp;
	 var mkdirsSync = require('mkdir').mkdirsSync;
	 var config = {};
	 
	 this.run = function() {
			this.loadConfig('./cf-kassid-deploy.json');
			mkdirsSync(this.config['dir']);
			this.copyFiles();
	 },
	 
	 
	 this.copyFiles = function() {
		  
		 for(file in this.config['copy']) {
				ncp(file, this.config['dir'] + '/' + this.config['copy'][file], function (err) {
				 if (err) {
				   return console.error(err);
				 }
				 console.log(file+' copied!');
				});
			}
	 },
	 
	 this.loadConfig = function(resource) {
		if (path.existsSync(resource)) {
			try {
				this.config = JSON.parse(fs.readFileSync(resource));

			} catch (err) {
				throw new Error("Could not parse JSON defaults at "+path.resolve(resource));
			}
		}
	}
	
}).call(this)






