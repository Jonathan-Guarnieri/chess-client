'use client';

import React from 'react';

export default function LoadingPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.5rem',
        fontWeight: '500',
        backgroundColor: '#f5f5f5',
        color: '#333',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div>Checking your session, please wait...</div>
        <div style={{ fontSize: '0.875rem', color: '#777', marginTop: '0.5rem' }}>
          If this takes too long, the server may be unavailable.
        </div>
      </div>
    </div>
  );
}