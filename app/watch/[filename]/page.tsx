'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user.store';
import VideoService from '@/services/video.service';
import { Video } from '@/types/video';

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
  color: 'white', // For text messages
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
  const router = useRouter();
  const { user, loading: userLoading } = useUserStore();

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const videoStreamUrl = video ? `${API_URL}/video-stream/stream/${video.url.split('/').pop()}` : '';

  useEffect(() => {
    if (userLoading) {
      return; // Wait for user store to load
    }

    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchVideo = async () => {
      try {
        // Assuming filename from URL is the video ID
        const fetchedVideo = await VideoService.findOne(filename as string);
        setVideo(fetchedVideo);
      } catch (err) {
        console.error('Failed to fetch video:', err);
        setError('Videoni yuklashda xato yuz berdi. Iltimos, qayta urinib ko\'ring.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    // DRM deterrents (not foolproof)
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
        // alert('This action is disabled.'); // Optional: alert user
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filename, user, userLoading, router]);

  if (loading) {
    return (
      <div style={pageStyles}>
        <p>Video yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyles}>
        <p>{error}</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div style={pageStyles}>
        <p>Video topilmadi.</p>
      </div>
    );
  }

  return (
    <div style={pageStyles}>
      <div style={overlayStyles} />
      <div style={videoContainerStyles}>
        {videoStreamUrl && (
            <video src={videoStreamUrl} style={videoStyles} controls controlsList="nodownload" />
        )}
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, textAlign: 'center', fontSize: '0.8em', color: 'rgba(255,255,255,0.7)', zIndex: 20 }}>
        <p>Eslatma: Ekranni yozib olish va skrinshot qilishga qarshi choralar ko'rilgan bo'lsa-da, bu to'liq himoya emas. Kontentni ruxsatsiz tarqatish qonun bilan taqiqlanadi.</p>
      </div>
    </div>
  );
}