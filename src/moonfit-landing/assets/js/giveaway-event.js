(
    function ($) {
        'use strict'
        const Helpers = window.moonfit.Helpers
        const USER_LS_KEY = "userAccount"
        const GLEAM_EMBED_CODE = '<a class="e-widget no-button" href="https://gleam.io/Nfums/moonfit-official-whitelist" rel="nofollow">MoonFit Official Whitelist</a>\n' +
            '<script type="text/javascript" src="https://widget.gleamjs.io/e.js" async="true"></script>'
        const MOONBEAM_CHAIN_ID = 504
        const MOONBEAM_CHAIN_ID_HEX = "0x504"
        const WEB3_METHODS = {
            addMoonbeamNetwork: {
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: MOONBEAM_CHAIN_ID_HEX,
                        rpcUrls: ['https://rpc.api.moonbeam.network'],
                        chainName: 'Moonbeam',
                        nativeCurrency: {name: 'GLMR', decimals: 18, symbol: 'GLMR'},
                        blockExplorerUrls: ['https://moonbeam.moonscan.io/']
                    }
                ]
            },
            switchToMoonbeamNetwork: {
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: MOONBEAM_CHAIN_ID_HEX
                    }
                ]
            },
        }

        $(document).ready(function () {
            renderWalletArea()
        })

        $(window).on('load', function () {
            $(document).on("click", "#subwallet-connect-btn", onConnect)
            $(document).on("click", "#logout-btn", onLogout)
            $(document).on("click", "#address-copy-btn", async () => {
                const wallet = JSON.parse(localStorage.getItem(USER_LS_KEY))
                Helpers.copyToClipboard(wallet.account)

                // Show toast
                const $toast = $('<div class="moonfit-toast show">Copied</div>')
                $('body').append($toast)
                setTimeout(function () {
                    $toast.remove()
                }, 2000)

                const $gleamCompetition = $('#gleam-competition')
                if ($gleamCompetition.length > 0) {
                    const offsetTop = $gleamCompetition.offset().top

                    window.scroll({
                        top: offsetTop - 30,
                        left: 0,
                        behavior: 'smooth'
                    })
                }
            })
            renderGleam()
        })

        const isMobileOrTablet = () => {
            return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))
        }


        const renderWalletArea = () => {
            const isSubWalletInstalled = Boolean(window.injectedWeb3 && window.SubWallet)
            const isConnected = checkConnectedWallet()
            const isMobileOrTable = isMobileOrTablet()
            const walletInfoArea = $('#wallet-info-area')

            if (isMobileOrTable) {
                // const embedPosition = document.querySelector('#gleam-competition')
                // embedCompetition(embedPosition, GLEAM_EMBED_CODE)
                const walletInfo = document.querySelector('#wallet-info-area')
                walletInfo && walletInfo.remove()
            } else if (!isSubWalletInstalled) {
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

            if (isMobileOrTablet() || isSubWalletInstalled && isConnected && embedPosition) {
                embedCompetition(embedPosition, GLEAM_EMBED_CODE)
            } else removeGleam()
        }

        const removeGleam = () => {
            const gleamWidget = document.querySelector('.e-widget-wrapper')
            gleamWidget && gleamWidget.remove()
            const gleamPreloader = document.querySelector('.e-widget-preloader')
            gleamPreloader && gleamPreloader.remove()
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
                await provider.request({method: 'eth_requestAccounts'})
                const chainId = await provider.request({method: 'eth_chainId'})
                // console.log(chainId, chainId.toString(), MOONBEAM_CHAIN_ID.toString())
                if (!chainId || chainId.toString() !== MOONBEAM_CHAIN_ID.toString()) {
                    console.log("Not Moonbeam Network")
                    try {
                        await provider.request(WEB3_METHODS.switchToMoonbeamNetwork)
                    } catch (e) {
                        console.log("Cannot switchToMoonbeamNetwork: ", e.message)
                        await provider.request(WEB3_METHODS.addMoonbeamNetwork)
                    }
                }

                const web3 = new Web3(provider)
                const userAccount = await web3.eth.getAccounts()
                const account = userAccount[0]
                // let ethBalance = await web3.eth.getBalance(account) // Get wallet balance
                // ethBalance = web3.utils.fromWei(ethBalance, 'ether')

                const userInfo = {
                    chainId,
                    account,
                }
                saveUserInfo(userInfo)
                onSuccessfullyConnect()
                renderGleam()
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
                                        <div class="wallet-address-heading">
                                            <div>Your address: </div>
                                        </div>
                                        <div class="wallet-address">
                                            <div class="wallet-icon"></div>
                                            <div id="wallet-account-address"><span>${walletInfo.account}</span></div>
                                            <span class="logout-connect-subwallet button" id="logout-btn">
                                                Log out
                                            </span>
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
            removeGleam()
        }

    }(jQuery)
)
