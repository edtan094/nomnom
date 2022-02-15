import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div>
      <div className="container">
        {children}
      </div>
    </div>
  );
}
