'use client';

import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

// Basic styling for the page and to discourage screenshots
const pageStyles: React.CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'black',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

const overlayStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 10,
  background: 'url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" height=\"100px\" width=\"100px\"><text x=\"0\" y=\"50\" fill=\"rgba(255,255,255,0.05)\" font-size=\"10\">CONFIDENTIAL</text></svg>")',
  backgroundRepeat: 'repeat',
};

const videoContainerStyles: React.CSSProperties = {
    position: 'relative',
    width: '90%',
    maxWidth: '1280px',
};

const videoStyles: React.CSSProperties = {
  width: '100%',
  height: 'auto',
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.uygunlik.uz';

export default function WatchPage() {
  const { filename } = useParams();
  const videoUrl = filename ? `${API_URL}/video-stream/stream/${filename}` : '';

  useEffect(() => {
    // This is a deterrent, not a foolproof solution.
    // It tries to disable context menu and some keyboard shortcuts.
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        // alert('This action is disabled.');
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={pageStyles}>
      <div style={overlayStyles} />
      <div style={videoContainerStyles}>
        {videoUrl && (
            <video src={videoUrl} style={videoStyles} controls controlsList="nodownload" />
        )}
      </div>
    </div>
  );
}