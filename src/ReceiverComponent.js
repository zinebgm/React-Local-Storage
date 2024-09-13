import  useLocalStorage  from './useLocalStorage';

import React from 'react'

const ReceiverComponent = () => {
    const [value] = useLocalStorage('firstKey', '');


  return (
    <div>
        <h2>Receiver Component</h2>
        <p>Current Value : {value}</p>
    </div>
  )
}

export default ReceiverComponent