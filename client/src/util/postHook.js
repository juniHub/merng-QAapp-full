import { useState } from 'react';

export const useForm = (callback, initialState = {body: ""}) => {
  const [ values, setValues ] = useState( initialState );
  
  const onChange = (event) => {
    setValues( { ...values, body:event } );
   
  };
 
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
   
  };

 

 

  const clear = () =>
  {
    setValues( { body: ''} );
    
  };

  



  return {

    onChange,

    onSubmit,
    values,
   
    clear,
    
 
   
  
  };
};
