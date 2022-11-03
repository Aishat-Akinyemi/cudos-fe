import React, {useState, useCallback, useEffect} from 'react';
import { getReplies } from "../utils/cudos";


const ResponseList = ({currentUser, updateCanRespond}) => {
    const [replies, setReplies] = useState([]);

    const getResponses = useCallback(async () => {
      try {
        setReplies((await getReplies()).replies);   
        isUserAlreadyReplied();
      } catch (error) {
        alert({error});
      }      
    });

    useEffect(() => {      
      getResponses();
    }, [currentUser]);

    const isUserAlreadyReplied = ()=> {
      if (currentUser == null) {
        return;
      } 
      const index = replies.find( reply => reply.addr === currentUser.address );
      if (!index) {
        updateCanRespond(true) ;
        return;
      }
    }

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
