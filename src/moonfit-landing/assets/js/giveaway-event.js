(
    function ($) {
        'use strict'
        const USER_LS_KEY = "userAccount"
        const GLEAM_EMBED_CODE = '<a class="e-widget no-button" href="https://gleam.io/Nfums/moonfit-official-whitelist" rel="nofollow">MoonFit Official Whitelist</a>\n' +
            '<script type="text/javascript" src="https://widget.gleamjs.io/e.js" async="true"></script>'

        $(document).ready(function () {
            renderWalletArea()
        })

        $(window).on('load', function () {
            $(document).on("click", "#subwallet-connect-btn", onConnect)
            $(document).on("click", "#logout-btn", onLogout)
            $(document).on("click", "#address-copy-btn", async () => {
                const wallet = JSON.parse(localStorage.getItem(USER_LS_KEY))
                await navigator.clipboard.writeText(wallet.account)

                var $gleamCompetition = $('#gleam-competition');
                if( $gleamCompetition.length > 0 ) {
	                const offsetTop = $gleamCompetition.offset().top;

	                window.scroll( {
		                top: offsetTop - 30,
		                left: 0,
		                behavior: 'smooth'
	                } );
                }
            })
            renderGleam()
        })

        const renderWalletArea = () => {
            const isSubWalletInstalled = Boolean(window.injectedWeb3 && window.SubWallet)
            const isConnected = checkConnectedWallet()
            const walletInfoArea = $('#wallet-info-area')

            if (!isSubWalletInstalled) {
                walletInfoArea.empty()
                walletInfoArea.html('<a class="button button-subwallet button-connect-subwallet" href="https://bit.ly/3BGqFt1" target="_blank" id="subwallet-install-btn">\n' +
                    '<span class="button-text">Install SubWallet to Start</span>\n' +
                    '</a>')

            } else if (isSubWalletInstalled && !isConnected) {
                walletInfoArea.empty()
                walletInfoArea.html('<div class="button button-subwallet button-connect-subwallet" id="subwallet-connect-btn">\n' +
                    '<span class="button-text">Login with SubWallet</span>\n' +
                    '</div>')
            } else {
                const wallet = JSON.parse(localStorage.getItem(USER_LS_KEY))
                onSuccessfullyConnect(wallet)
            }
        }

        const renderGleam = () => {
            const isSubWalletInstalled = Boolean(window.injectedWeb3 && window.SubWallet)
            const isConnected = checkConnectedWallet()
            const embedPosition = document.querySelector('#gleam-competition')

            if (isSubWalletInstalled && isConnected && embedPosition) {
                embedCompetition(embedPosition, GLEAM_EMBED_CODE)
            } else {
                const gleamWidget = document.querySelector('.e-widget-wrapper')
                gleamWidget && gleamWidget.remove()
            }
        }

        const saveUserInfo = (account) => {
            window.localStorage.setItem(USER_LS_KEY, JSON.stringify(account)) // user persisted data
        }

        const checkConnectedWallet = () => {
            const userData = JSON.parse(localStorage.getItem(USER_LS_KEY))
            return !!userData
        }

        const onConnect = async () => {
            try {
                const provider = window.SubWallet
                if (!provider) {
                    console.log('SubWallet is not installed')
                }
                const web3 = new Web3(window.SubWallet)

                await provider.request({method: 'eth_requestAccounts'})
                const userAccount = await web3.eth.getAccounts()
                // const chainId = await web3.eth.getChainId()
                // const chainId = await provider.request({method: 'eth_chainId'})
                const account = userAccount[0]
                // let ethBalance = await web3.eth.getBalance(account) // Get wallet balance
                // ethBalance = web3.utils.fromWei(ethBalance, 'ether')

                const userInfo = {
                    // chainId,
                    account,
                }
                saveUserInfo(userInfo)
                onSuccessfullyConnect()
                renderGleam(userInfo)
            } catch (err) {
                console.log(err)
            }
        }

        const onSuccessfullyConnect = (wallet = null) => {
            const walletInfoArea = $('#wallet-info-area')
            const walletInfo = wallet || JSON.parse(localStorage.getItem(USER_LS_KEY))
            const html = `<div class="connected-wallet-info-card">
                                    <div class="card-title">
                                        Connect successfully with subwallet
                                    </div>
                                    <div class="card-body">
                                        <div class="wallet-address">
                                            <div class="wallet-address-heading">
                                                <div>Your Wallet: </div>
                                                <span class="logout-connect-subwallet" id="logout-btn">
                                                    Logout
                                                </span>
                                            </div>
                                            <span id="wallet-account-address">${walletInfo.account}</span>
                                        </div>
                                        <div class="button button-secondary icon-right"
                                             id="address-copy-btn">
                                            <span class="button-text">
                                                Copy Address for WhiteList Form Submission below
                                            </span>
                                            <span class="button-icon">
                                                <i class="far fa-arrow-down"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <a href="#gleam-competition" class="scroll-to go-to-gleam-competition"></a>
                                </div>`
            walletInfoArea.empty()
            walletInfoArea.html(html)
        }

        const embedCompetition = (el, html) => {
            el.innerHTML = html
            Array.from(el.querySelectorAll("script")).forEach(oldScript => {
                const newScript = document.createElement("script")
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value))
                newScript.appendChild(document.createTextNode(oldScript.innerHTML))
                oldScript.parentNode.replaceChild(newScript, oldScript)
            })
        }

        const onLogout = () => {
            // console.log('Logout')
            window.localStorage.removeItem(USER_LS_KEY)
            renderWalletArea()
            // renderGleam()
            const gleamWidget = document.querySelector('.e-widget-wrapper')
            gleamWidget && gleamWidget.remove()
        }

    }(jQuery)
)
