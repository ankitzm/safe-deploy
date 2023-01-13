if (typeof ethereum !== "undefined") {
	// MetaMask is installed and enabled
	console.log("eth object is available")
	console.log(ethereum);

	//   ethereum.sendAsync('eth_requestAccounts').then(function(networkId) {
	// 	// Update the network display
	// 	document.getElementById('network-display').innerHTML = 'Connected to network: ' + networkId;
	//   });
} else {
	// MetaMask is not installed or enabled
	console.log("not enabled")
}

const ethereumButton = document.getElementById("enableEthereumButton")
const showAccount = document.getElementById("showAccount")
const deployBtn = document.getElementById("deployBtn")
const getBinaryBtn = document.getElementById("getBinaryButton")
const networkDisplay = document.getElementById('network-display')
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

	if (account) {
		ethereumButton.innerHTML = "Wallet Connected ⚡"	
		toast('⚡ Wallet Connected')
		deployBtn.style.display = "block"
	}
}

// get binary

getBinaryBtn.addEventListener("click", () => {
	if (binaryData) {
		console.log(binaryData)
		toast("Check Browser Console")
	} else {
		toast("No data found")
	}
})

// deloy smart contract

deployBtn.addEventListener("click", () => {
	if (binaryData) {
		toast("deploying, check metamask ..")
		fetch("/file")
			.then(response => response.json())
			.then(data => {
				binaryData = data
			})

		deploy(binaryData.bytecode)
	} else {
		toast("No data found")
	}
})

ethereum.on('chainChanged', function(networkId) {
	// Update the network display
	document.getElementById('network-display').innerHTML = 'Connected to network: ' + networkId;
  });

function toast(message) {
    var x = document.getElementById("toast");
	x.innerHTML = message
	x.className = "show";
	
	// After 5.5 seconds, remove the show class from DIV
	setTimeout(function () { x.className = x.className.replace("show", ""); }, 5500);
}
