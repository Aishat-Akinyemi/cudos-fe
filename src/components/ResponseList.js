import React from 'react';


const ResponseList = ({replies}) => {
      
  return (
    <div className='responseList'>
    { 
      replies && 
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
    }
    </div>
  )
}

export default ResponseList
