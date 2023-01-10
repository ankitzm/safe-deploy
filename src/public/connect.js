if (typeof ethereum !== "undefined") {
	// MetaMask is installed and enabled
	console.log("eth object is available")
} else {
	// MetaMask is not installed or enabled
	console.log("not enabled")
}

const ethereumButton = document.getElementById("enableEthereumButton")
const showAccount = document.getElementById("showAccount")

ethereumButton.addEventListener("click", () => {
	getAccount()
})

var accounts = []

async function getAccount() {
	accounts = await ethereum.request({
		method: "eth_requestAccounts",
	})

	const account = accounts[0]
	showAccount.innerHTML = "Connected Account : " + account

	ethereum.on("accountsChanged", function (account) {
		console.log("account changed - " + account)
	})
}

// get binary

var binaryData

const getBinaryBtn = document.getElementById("getBinaryButton")

fetch("/file")
	.then(response => response.json())
	.then(data => {
		binaryData = data
	})

getBinaryBtn.addEventListener("click", () => {
	binaryData ? console.log(binaryData) : console.log("no data")
})

// deloy smart contract

const deployBtn = document.getElementById("deployBtn")

deployBtn.addEventListener("click", () => {
	fetch("/file")
		.then(response => response.json())
		.then(data => {
			binaryData = data
		})

	deploy(binaryData.bytecode)
})
