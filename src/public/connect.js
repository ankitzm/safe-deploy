if (typeof ethereum !== "undefined") {
	// MetaMask is installed and enabled
	console.log("eth object is available")
} else {
	// MetaMask is not installed or enabled
	console.log("not enabled")
}

const ethereumButton = document.querySelector(".enableEthereumButton")
const showAccount = document.querySelector(".showAccount")

ethereumButton.addEventListener("click", () => {
	getAccount()
})

async function getAccount() {
	const accounts = await ethereum.request({
		method: "eth_requestAccounts",
	})
	const account = accounts[0]
	showAccount.innerHTML = account
}



// get binary

const getBinaryBtn = document.querySelector(".getBinaryButton")

let binaryData
fetch("/file")
	.then(response => response.json())
	.then(data => {
		binaryData = data
	})

getBinaryBtn.addEventListener("click", () => {
	binaryData ? console.log(binaryData) : console.log("no data")
})
