import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

export default () => {
    useEffect(() => {
        const data =  axios.get('/api/guilds').then((data) => data);
            console.log(data);
    }, [])
        
  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue='ocean'
        name="color"
      />

      <div
        style={{
          color: 'hsl(0, 0%, 40%)',
          display: 'inline-block',
          fontSize: 12,
          fontStyle: 'italic',
          marginTop: '1em',
        }}
      >
      </div>
    </>
  );
};