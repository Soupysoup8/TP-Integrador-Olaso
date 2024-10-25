import React from 'react';

function EntryCard({ title, preview, onClick }) {
    return (
        <div className='entry-card'> 
            <h5>{title}</h5>
            <p>{preview}</p>
            <button onClick={onClick}>- Leer más</button>
        </div>
    );
}

export default EntryCard;
