import React from 'react';

const Wallet = ({login, user}) => {
  return (
    <div className='Wallet'>
      {
        user 
        ?
        <button className="button-29 walletButton" disabled={true}>
          {user.address.substring(0,20)}...
        </button>
        :
        <button className="button-29 walletButton" onClick={login}>
          Connect Keplr Wallet
        </button>
      }
    </div>
  )
}

export default Wallet
