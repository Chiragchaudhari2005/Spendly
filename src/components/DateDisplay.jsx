import {useState, useEffect} from 'react';

const DateDisplay = () =>{
    const formatDate = (date) =>{
        const day = String(date.getDate()).padStart(2,'0');
        const month = String(date.getMonth()+1).padStart(2,'0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return(
        <div>
             Date: {formatDate(new Date())} 
        </div>
    );
}

export default DateDisplay;