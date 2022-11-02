import React, {useState, useEffect} from 'react'

const response = {
    replies: [
      {
        addr: "add1",
        reply: {
        text: 'hi'
       }
      },
      {
        addr: "add2",
        reply: {
        text: 'he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!he dApp says: Hello World!!'
       }
      }
    ]
  };
const ResponseList = () => {
    const [replies, setReplies] = useState(response.replies);
  return (
    <div className='responseList'>
      <table className='styled-table'>
        <thead>
            <tr>
                <th>Address</th>
                <th>Response</th>
            </tr>
        </thead>
        <tbody>
            { replies.map((reply, index)=> (
            <tr key={index}>
                    <td>{reply.addr}</td>
                    <td>{reply.reply.text}</td>
            </tr> 
            ) )}
        </tbody>        
      </table>
    </div>
  )
}

export default ResponseList
