"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/user.store";

// TypewriterText komponenti
function TypewriterText({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80); // Har bir harf uchun 80ms

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </div>
  );
}

export default function HomePage() {
  const { user } = useUserStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-800" />
            <h1 className="text-2xl font-bold text-red-900">Uyg'unlik</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#courses" className="text-gray-600 hover:text-red-800">
              Kurslar
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-red-800">
              Tariflar
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-red-800">
              Biz haqimizda
            </Link>
            {user ? (
              <>
                <Link href="/dashboard">{user?.first_name}</Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-red-800"
                >
                  Kirish
                </Link>
                <Link href="/register">
                  <Button className="bg-red-800 hover:bg-red-900">
                    Ro'yxatdan o'tish
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-[url('/images/header.jpg')] bg-cover bg-center">
        {/* Background Image */}
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-red-50/50 to-red-900/80 z-0"></div>

        {/* Bottom blur overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-900/90 via-red-800/60 to-transparent backdrop-blur-sm z-5"></div>

        {/* Hero content */}
        <div className="mx-auto h-full px-4 relative z-10 pt-12 pb-24">
          {/* Logo with animation from bottom */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img
              src="/images/logo-decorated.png"
              alt="Uyg'unlik"
              className="h-24 md:h-32"
            />
          </motion.div>

          {/* Tagline with typewriter animation */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <TypewriterText
              text="Ayollik tabiatingiz bilan hamohanglikda yashang"
              className="text-xl md:text-2xl lg:text-3xl text-red-900 italic font-serif"
            />
          </motion.div>

          {/* Main content - centered */}
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
            {/* Main heading */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-900 mb-8">
                Tabiiy usul bilan homiladorlikni rejalashtiring yoki oldini
                oling
              </h2>
            </motion.div>

            {/* Course info with animation */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-red-100 mb-12 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="w-1 h-16 bg-red-800 mr-4"></div>
                  <div>
                    <p className="text-xs text-gray-600">Start:</p>
                    <p className="text-base font-semibold text-red-900">
                      Avgust, 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1 h-16 bg-red-800 mr-4"></div>
                  <div>
                    <p className="text-xs text-gray-600">Davomiyligi:</p>
                    <p className="text-base font-semibold text-red-900">
                      8 hafta
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button with animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={user ? "#pricing" : "/register"}>
                <Button
                  size="lg"
                  className="bg-red-800 hover:bg-red-900 text-xl px-12 py-8 rounded-full"
                >
                  ISHTIROK ETAMAN
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-red-200"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nima uchun Uyg'unlik?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="text-center border-red-100 h-full">
                <CardHeader>
                  <Shield className="h-12 w-12 text-red-800 mx-auto mb-4" />
                  <CardTitle className="text-red-900">
                    Xavfsiz va tabiiy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Hech qanday kimyoviy preparatlar va yon ta'sirlarsiz, faqat
                    tabiiy usullar orqali o'z tanangizni nazorat qiling.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="text-center border-red-100 h-full">
                <CardHeader>
                  <Users className="h-12 w-12 text-red-800 mx-auto mb-4" />
                  <CardTitle className="text-red-900">
                    Professional yo'riqnoma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Tajribali mutaxassislar tomonidan tayyorlangan kurslar va
                    doimiy qo'llab-quvvatlash xizmati.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="text-center border-red-100 h-full">
                <CardHeader>
                  <Award className="h-12 w-12 text-red-800 mx-auto mb-4" />
                  <CardTitle className="text-red-900">
                    Sertifikat olish
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Kursni muvaffaqiyatli tamomlaganingizdan so'ng rasmiy
                    sertifikat oling.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Course Overview */}
      <section id="courses" className="py-16 px-4 bg-red-50">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Kurs modullari
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <CardTitle className="text-red-900">
                    1-modul: Asoslar
                  </CardTitle>
                  <CardDescription>
                    Ayol organizmining asosiy qonuniyatlari
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Menstrual tsiklning fazalari
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Gormonlar va ularning ta'siri
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Ovulyatsiya belgilari
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <CardTitle className="text-red-900">
                    2-modul: Kuzatish usullari
                  </CardTitle>
                  <CardDescription>
                    Tabiiy belgilarni kuzatish va tahlil qilish
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Bazal haroratni o'lchash
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Servikal mukus tahlili
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Bachadon bo'yni holati
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <CardTitle className="text-red-900">
                    3-modul: Rejalashtirish
                  </CardTitle>
                  <CardDescription>
                    Homiladorlikni rejalashtirish strategiyalari
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Unumdor kunlarni aniqlash
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Xavfsiz kunlar hisoblash
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Grafik va jadvallar
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <CardTitle className="text-red-900">
                    4-modul: Amaliyot
                  </CardTitle>
                  <CardDescription>
                    Real hayotda qo'llash va maslahatlar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Kundalik kuzatuvlar
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Noto'g'ri holatlar tahlili
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2" />
                      Mutaxassis maslahatlar
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Tariflar
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Standard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-gray-200 h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Standart</CardTitle>
                  <div className="text-3xl font-bold text-gray-900">
                    299,000 so'm
                  </div>
                  <CardDescription>Asosiy kurs materiallari</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />4
                      ta asosiy modul
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      20+ video dars
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      PDF materiallar
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />3
                      oy kirish huquqi
                    </li>
                  </ul>
                  <Link
                    href={
                      user
                        ? `https://t.me/Tilav_web?text=Assalomu alaykum men ${user.first_name}. Sizning Standart kursingizni sotib olmoqchiman.`
                        : "/register"
                    }
                    target="_blanck"
                    className="block"
                  >
                    <Button className="w-full bg-gray-600 hover:bg-gray-700">
                      Tanlash
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Optimal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-red-500 relative h-full">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-800">
                  Mashhur
                </Badge>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-red-900">
                    Optimal
                  </CardTitle>
                  <div className="text-3xl font-bold text-red-800">
                    499,000 so'm
                  </div>
                  <CardDescription>
                    Qo'shimcha materiallar bilan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Standart tarifning barchasi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Bonus darslar
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Interaktiv testlar
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />6
                      oy kirish huquqi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Email qo'llab-quvvatlash
                    </li>
                  </ul>
                  <Link href="/register" className="block">
                    <Button className="w-full bg-red-800 hover:bg-red-900">
                      Tanlash
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* VIP */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-red-300 h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-red-900">VIP</CardTitle>
                  <div className="text-3xl font-bold text-red-800">
                    799,000 so'm
                  </div>
                  <CardDescription>To'liq qo'llab-quvvatlash</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Optimal tarifning barchasi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Maxsus VIP darslar
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />1
                      yil kirish huquqi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Shaxsiy konsultatsiya
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Telegram guruh
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Sertifikat
                    </li>
                  </ul>
                  <Link href="/register" className="block">
                    <Button className="w-full bg-red-800 hover:bg-red-900">
                      Tanlash
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-800 to-red-900 text-white">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Bugun o'z sog'ligingizga g'amxo'rlik qiling!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Minglab ayollar allaqachon o'z hayotlarini o'zgartirishdi. Siz ham
              qo'shiling!
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3"
                >
                  Hoziroq boshlash
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-bold">Uyg'unlik</h3>
              </div>
              <p className="text-gray-400">
                Ayollar uchun tabiiy va xavfsiz homiladorlik rejalashtirish
                kurslari.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kurslar</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Asosiy kurs</li>
                <li>Ilg'or usullar</li>
                <li>Amaliy mashg'ulotlar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yordam</h4>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Qo'llab-quvvatlash</li>
                <li>Bog'lanish</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Aloqa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+998 90 123 45 67</li>
                <li>info@uygunlik.uz</li>
                <li>Telegram: @uygunlik_uz</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Uyg'unlik. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
