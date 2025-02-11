import React from 'react';

const Section = ({ id, title, children }) => {
    return (
      <section id={id} className="content">
        {title && <h2>{title}</h2>}
        {children}
      </section>
    );
  };
  
  export default Section;