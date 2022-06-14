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
            })
            renderGleam()
        })

        const renderWalletArea = () => {
            const isSubWalletInstalled = Boolean(window.injectedWeb3 && window.injectedWeb3['subwallet-js'])
            const isConnected = checkConnectedWallet()
            const walletInfoArea = $('#wallet-info-area')

            if (!isSubWalletInstalled) {
                walletInfoArea.empty()
                walletInfoArea.html('<a class="button button-blue" href="https://bit.ly/3BGqFt1" target="_blank" id="subwallet-install-btn">\n' +
                    '<span class="button-text">Install SubWallet to Start</span>\n' +
                    '</a>')

            } else if (isSubWalletInstalled && !isConnected) {
                walletInfoArea.empty()
                walletInfoArea.html('<div class="button button-blue" id="subwallet-connect-btn">\n' +
                    '<span class="button-text">Login with SubWallet</span>\n' +
                    '</div>')
            } else {
                const wallet = JSON.parse(localStorage.getItem(USER_LS_KEY))
                onSuccessfullyConnect(wallet)
            }
        }

        const renderGleam = () => {
            const isConnected = checkConnectedWallet()

            const embedPosition = document.querySelector('#gleam-competition')
            if (isConnected && embedPosition) {
                embedCompetition(embedPosition, GLEAM_EMBED_CODE)
            } else {
                const gleamWidget = document.querySelector('.e-widget-wrapper')
                gleamWidget && gleamWidget.remove()
            }
        }

        const saveUserInfo = (account) => {
            const userAccount = {
                ...account,
                account: account.address,
            }
            window.localStorage.setItem(USER_LS_KEY, JSON.stringify(userAccount)) // user persisted data
        }

        const checkConnectedWallet = () => {
            const userData = JSON.parse(localStorage.getItem(USER_LS_KEY))
            return !!userData
        }

        const onConnect = async () => {
            try {
                const SubWalletExtension = window.injectedWeb3['subwallet-js']
                console.log('SubWalletExtension', SubWalletExtension)
                const extension = await SubWalletExtension.enable()
                const accounts = await extension.accounts.get()
                saveUserInfo(accounts[0])
                onSuccessfullyConnect({
                    ...accounts[0],
                    account: accounts[0].address,
                })
                renderGleam()
            } catch (err) {
                console.log(err.message)
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
                                            Your Wallet: <span id="wallet-account-address">${walletInfo.account}</span>
                                            <span class="button button-primary" id="logout-btn">
                                                <i class="fad fa-sign-out-alt"></i>
                                            </span>
                                        </div>
                                        <div class="button button-secondary"
                                             id="address-copy-btn">
                                            <span class="button-text">
                                                Copy Address for WhiteList Form Submission below
                                                <i class="fad fa-arrow-circle-down icon-right"></i>
                                            </span>
                                        </div>
                                    </div>
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
            console.log('Logout')
            window.localStorage.removeItem(USER_LS_KEY)
            renderWalletArea()
            renderGleam()
        }

    }(jQuery)
)
