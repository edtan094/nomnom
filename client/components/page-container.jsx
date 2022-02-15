import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div className="bg-light">
      <div className="container">
        {children}
      </div>
    </div>
  );
}
