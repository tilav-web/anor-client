"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import VideoService from "@/services/video.service";
import { Video } from "@/types/video";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.uygunlik.uz";

export default function WatchPage() {
  const { filename } = useParams();
  const router = useRouter();
  const { user, loading: userLoading } = useUserStore();

  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      router.push("/auth");
      return;
    }

    const fetchVideo = async () => {
      try {
        const fetchedVideo = await VideoService.findByFilename(filename as string);
        setVideo(fetchedVideo);
      } catch (err) {
        console.error("Video metadata error:", err);
        setError("Videoni yuklashda xatolik yuz berdi. Qayta urinib ko‘ring.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();

    // Bloklash choralar
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" ||
        (e.ctrlKey && e.key.toLowerCase() === "p") ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [filename, user, userLoading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Video yuklanmoqda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-400">
        <p>Video topilmadi.</p>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center">
      {/* Overlay suv belgisi */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'100px\' width=\'100px\'><text x=\'0\' y=\'50\' fill=\'rgba(255,255,255,0.05)\' font-size=\'14\'>CONFIDENTIAL</text></svg>")',
          backgroundRepeat: "repeat",
        }}
      />

      {/* Video container */}
      <div className="relative w-11/12 max-w-5xl">
        <video
          src={`${API_URL}/video-stream/stream/${video.url.split("/").pop()}`}
          className="w-full rounded-xl shadow-xl"
          controls
          controlsList="nodownload"
          disablePictureInPicture
          playsInline
        />
      </div>

      {/* Ogohlantirish matni */}
      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-400 z-20">
        <p>
          ⚠️ Kontent himoyalangan. Ekranni yozib olish va skrinshot qilishga
          qarshi choralar qo‘llangan, ammo bu to‘liq himoya emas. Ruxsatsiz
          tarqatish qonun bilan taqiqlanadi.
        </p>
      </div>
    </div>
  );
}
