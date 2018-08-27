//import express from 'express'
const express = require("express");

const db = require("./data/db");

const server = express();

//configure middleware
server.use(express.json());

//configure routing (also middleware)
server.get("/", (req, res) => {
	res.send("Hello Cs12");
});

server.get("/users", (req, res) => {
	db.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.err(err);
			res.status(500).json({ message: "Error getting the data" });
		});
});

server.post("/users", (req, res) => {
	console.log(req);
	if (!req.body.name || !req.body.bio) {
		return res.status(400).json({
			errorMessage: "Please provide name and bio for the user",
		});
	}

	db.insert(req.body)
		.then(id => res.status(201).json(id))
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get("/users/:id", async (req, res) => {
	try {
		let data = await db.findById(req.params.id);
		if (data.length > 0) {
			return res.status(200).json(data);
		}

		return res.status(404).json({
			message: "The user with the blablbhalbhalbhabhl doesn't exist",
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

//Start server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));