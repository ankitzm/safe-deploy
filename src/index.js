#!/usr/bin/env node
"use strict"

import express from "express"
import { readFile, readFileSync } from "fs"
import open from "open"
import path from "path"
import solc from "solc"
import getPort, { portNumbers } from "get-port"

const app = express()

const fileName = process.argv[2]

app.use(
	express.static(
		path.join(process.cwd(), "node_modules/safe-deploy/src/public"),
	),
)

if (!fileName) {
	console.log("no file argument provided")
} else {
	// automatically select free port after 3000
	getPort({ port: portNumbers(3000, 3100) }).then(port => {
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`)
			open(`http://localhost:${port}`)
		})
	})
}

app.get("/file", (req, res) => {
	const source = readFileSync(fileName, "utf8")
	const updatedSource = source.replace(
		/^pragma solidity (.*);$/m,
		"pragma solidity ^0.8.17;",
	) // compile every code with solidity version ^0.8.17

	var input = {
		language: "Solidity",
		sources: {
			"file.sol": {
				content: updatedSource,
			},
		},
		settings: {
			outputSelection: {
				"*": {
					"*": ["*"],
				},
			},
		},
	}

	var output = JSON.parse(solc.compile(JSON.stringify(input)))

	// `output` here contains the JSON output as specified in the documentation
	for (var contractName in output.contracts["file.sol"]) {
		var response = {
			abi: output.contracts["file.sol"][contractName].abi,
			bytecode: `0x${output.contracts["file.sol"][contractName].evm.bytecode.object}`,
		}

		// console.log(response)
		res.send(response)
	}
})
