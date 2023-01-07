#!/usr/bin/env node
"use strict"

import express from "express"
import { readFile, readFileSync } from "fs"
import open from "open"
import solc from "solc"

const app = express()
const port = 3030

const fileName = process.argv[2]

app.use(express.static("./src/public"))

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
	open(`http://localhost:${port}`)
})

app.get("/file", (req, res) => {
	const source = readFileSync(fileName, "utf8")
	const updatedSource = source.replace(
		/^pragma solidity (.*);$/m,
		"pragma solidity ^0.8.17;",
	) // compile every code with solidity version ^0.8.17

	var input = {
		language: "Solidity",
		sources: {
			solFile: {
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
	for (var contractName in output.contracts["solFile"]) {
		var response = {
			abi: output.contracts["solFile"][contractName].abi,
			bytecode: `0x${output.contracts["solFile"][contractName].evm.bytecode.object}`,
		}

		// console.log(response)
		res.send(response)
	}
})
