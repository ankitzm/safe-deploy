"use strict";

import express from "express"
import { readFile } from "fs"

const app = express()
const port = 3000

const fileName = process.argv[2]

app.use(express.static("./src/public"))

app.get("/file", (req, res) => {
	readFile(fileName, (err, data) => {
		if (err) {
			console.error(err)
			res.status(500).send(`Error reading file: ${err}`)
			return
		}

		res.send(data.toString())
	})
})

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
