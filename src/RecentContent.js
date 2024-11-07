// RecentContent.js
import React from 'react';

const RecentContent = ({ filteredContent }) => {
  return (
    <section className="content-section">
      <h3>Recent Content</h3>
      {filteredContent.map((item) => (
        <div key={item.id} className="content-item">
          <h4>{item.title}</h4>
          <p>{item.content}</p>
        </div>
      ))}
    </section>
  );
};

export default RecentContent;