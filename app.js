var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/pci_inventory");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// SCHEMA SETUP
var inventorySchema = new mongoose.Schema({
	host: String,
	software: String,
	application: String,
	ip_address: String,
	business_process: String,
	email: String,
});

var Inventory = mongoose.model("Inventory", inventorySchema);

// Inventory.create(
// {
// 	host: "bonobos.walmart.com",
// 	software: "bonobonobonobnos",
// 	application: "Solarwinds"
// }, function(err, inventory){
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY ENTERED RECORD FOR INVENTORY");
// 		console.log(inventory);
// 	}

// });

var inventories = [
	{host: "aaa.walmart.com", software: "acd", application: "asdfasd", ip_address: "10.7.202.1", business_process: "payments", email:"onekey@walmart.com"},
	{host: "nnn.walmart.com", software: "gwedf", application: "asdf", ip_address: "10.77.55.101", business_process: "settlements", email:"oneops@walmart.com"}
]

// app.get("/inventories/:id", function(req, res){
// 	Inventory.findById(req.params.id, function(err, foundInventory){
// 		if(err){
// 			res.redirect("/inventories");
// 		} else {
// 			// res.render("show", {inventory:foundInventory});
// 			console.log(foundInventory);
// 		}
// 	});
// });

// landing page route

app.get("/", function(req, res){
	res.render("landing");
});

 // index route to list the inventory
app.get("/inventories", function(req, res){
	Inventory.find({}, function(err, allInventories){
		if(err){
			console.log(err);			
		} else {
			res.render("index", {inventories:allInventories});
		}
	});
});

// delete route

app.delete("/inventories/:id", function(req, res){
	res.send("thisis the destroy route")
	// Inventory.findByIdAndRemove(req.params.id, function(err){
	// 	if(err){
	// 		//res.redirect("inventories");
	// 		console.log(err);
	// 	} else {
	// 		res.redirect("/inventories");
	// 	}
	// });
});

// create route
app.post("/inventories", function(req, res){
	var host = req.body.host;
	var soft = req.body.software;
	var appl = req.body.application;
	var ip = req.body.ip_address;
	var busn = req.body.business_process;
	var email = req.body.email;
	var newInventory = {host:host, software:soft, application:appl, ip_address:ip, business_process:busn, email:email}
	Inventory.create(newInventory, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/inventories");
		}
	});
});

app.get("/inventories/new", function(req, res){
	res.render("new");
});


app.listen(3000, process.env.IP, function(){
	console.log("application has started!");
});