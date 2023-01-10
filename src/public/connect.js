if (typeof ethereum !== "undefined") {
	// MetaMask is installed and enabled
	console.log("eth object is available")
} else {
	// MetaMask is not installed or enabled
	console.log("not enabled")
}

const ethereumButton = document.getElementById("enableEthereumButton")
const showAccount = document.getElementById("showAccount")
const deployBtn = document.getElementById("deployBtn")
var binaryData

fetch("/file")
	.then(response => response.json())
	.then(data => {
		binaryData = data
	})

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

		if (accounts.length > 0) {
			ethereumButton.innerHTML = "Wallet Connected ⚡"	
			toast('⚡ Wallet Connected')
			if (binaryData) {
				deployBtn.style.display = "block"
			}
	}
}

// get binary

const getBinaryBtn = document.getElementById("getBinaryButton")

getBinaryBtn.addEventListener("click", () => {
	binaryData ? console.log(binaryData) : toast("No data found")
})

// deloy smart contract

deployBtn.addEventListener("click", () => {
	toast("deploying, check metamask ..")
	fetch("/file")
		.then(response => response.json())
		.then(data => {
			binaryData = data
		})

	deploy(binaryData.bytecode)
})


function toast(message) {
    var x = document.getElementById("toast");
	x.innerHTML = message
	x.className = "show";
	
	// After 5.5 seconds, remove the show class from DIV
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 5500);
}
