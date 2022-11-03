import React, {useState} from 'react';

const ResponseForm = ({submit}) => {
  const [resp, setResp] = useState("");
  const handleChange = event => {
    event.preventDefault();
    let val = event.target.value.trim();
    setResp(val);
  };
    
  return (
    <div className='replyCont'>
      <label htmlFor="replyInput">Your Response</label>
      <input type="text" name="" id="replyInput" 
              placeholder='type a response...'  
              onChange={handleChange}
      />
      <button className='button-29' disabled={resp.length<=0}
        onClick={(e) => {
          e.preventDefault();
          submit(resp); 
          }}
      >Post</button>
    </div>
  )
}

export default ResponseForm
