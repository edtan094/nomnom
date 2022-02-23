import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div>
      <div className="container margin-top-10 margin-bottom">
        {children}
      </div>
    </div>
  );
}
