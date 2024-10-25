import React from 'react';

function EntryContent({ title, preview, content }){
    return (
        <div className='entry'> 
            <h3>{title}</h3>
            <p>{preview}</p>
            <div
                className="entry-content"
                dangerouslySetInnerHTML={{ __html: content }} // Renderiza el HTML
            />
        </div>
    );
}

export default EntryContent;