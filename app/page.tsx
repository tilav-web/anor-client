"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Plus,
  Minus,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/user.store";

// FAQ Accordion Component
const FAQAccordion = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Metod qanchalik ishonchli? Homilador bo'lib qolmaymanmi?",
      answer: `Fertillikni kuzatishning Simptotermal Metodi ilmiy tadqiqotlar bo'yicha 99,6% aniqlikka ega. Foydalanuvchi kuzatuv ishlarini doimiy va aniq olib borsa, ko'zlangan maqsadga erishiladi. Agar Foydalanuvchi kuzatuv ishlarini to'liq amalga oshirmasa, xatolik (saqlanishni ko'zda tutganlarda - homiladorlik) yuzaga kelsa - bu faqatgina juftlikning zimmasida bo'ladi, metoddagi kamchilikda emas.`,
    },
    {
      question: "Spiralim bor, kursda qatnashish uchun oldirishim kerakmi?",
      answer: `Ha, kurs boshlanishidan oldin spiralni oldirgan, garmonal tabletkalar qabul qilsangiz, ularni ichishni to'xtatgan bo'lishingiz kerak.`,
    },
    {
      question: `Metodni tug'ruqdan keyin, hayz ko'rmay turib ham, emizikli davrda qo'llay olamanmi?`,
      answer: `Albatta. Kuzatuvlarga asoslanib, barcha ayollar tug'ruqdan keyingi 3 haftada fertil (unumdor) bo'lmasliklari aniqlangan. Undan keyingi davrda, emizishning to'liq yoki aralash ekanligiga qarab, STM qoidalari bo'yicha kuzatuvni boshlashingiz mumkin.`,
    },
    {
      question:
        "Hali turmushga chiqmagan qiz bolaman. Kurs men uchun foydali bo'ladimi?",
      answer: `Bu kursda har bir qiz va ayol bilishi shart bo'lgan hayz ilmi, o'ziga g'amxo'rlik qilish, hayz davrining har kunida - tana, hissiyotlar, va garmonlardagi tabiiy o'zgarishlarni kuzatish va tushunish kabi muhim bilimlar beriladi. Turmush qurishdan avval o'z tanangizni, ayollik tabiatingizni chuqurroq anglab, uning ritmiga mos yashashni o'rganish - bo'lajak sog'lom homiladorlikka tayyorgarlik bo'lishi bilan birga, kelajakda dunyoga keladigan qiz farzandingiz tarbiyasida ham bebaho poydevor bo'lib xizmat qiladi. Bu - nafaqat bugungi salomatligingizga, balki ertangi avlodingizga ham qaratilgan eng dono sarmoyalardan biridir.`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-red-100 overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-red-50/50 transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-red-900 pr-4">
              {item.question}
            </h3>
            <div className="flex-shrink-0 text-red-600">
              {openItems.includes(index) ? (
                <Minus className="h-6 w-6" />
              ) : (
                <Plus className="h-6 w-6" />
              )}
            </div>
          </button>
          <AnimatePresence>
            {openItems.includes(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default function HomePage() {
  const { user } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#courses", label: "Kurslar" },
    { href: "#pricing", label: "Tariflar" },
    { href: "#about", label: "Biz haqimizda" },
  ];

  return (
    <div className="min-h-screen bg-red-50 text-gray-800">
      {/* --- Header --- */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-red-100/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center w-12 h-12">
                <img src="/images/logo-main.png" alt="" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-gray-600 hover:text-red-800 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-800 hover:bg-red-50"
                  >
                    {user.first_name}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth">
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-red-800"
                    >
                      Kirish
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Ro'yxatdan o'tish
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-red-800 hover:bg-red-100/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white/95 backdrop-blur-sm shadow-lg border-t border-red-100/50"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-800 hover:bg-red-50/50"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-red-100/50">
                <div className="px-5 space-y-3">
                  {user ? (
                    <Link href="/dashboard">
                      <Button
                        variant="outline"
                        className="w-full border-red-300 text-red-800 hover:bg-red-50"
                      >
                        {user.first_name}
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link href="/auth">
                        <Button
                          variant="ghost"
                          className="w-full text-gray-600 hover:text-red-800"
                        >
                          Kirish
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                          Ro'yxatdan o'tish
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section className="relative h-screen w-full overflow-hidden">
          <video
            src="/women.mp4"
            poster="/images/header.jpg" // Fallback image
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-10"
          ></video>
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-20"></div>
          <div className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-4">
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/images/logo-decorated.png"
                alt="Uyg'unlik Logo"
                className="h-20 md:h-28 [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.7))]"
              />
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Tabiiy usulda sog'lom hayot
            </motion.h1>
            <motion.p
              className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Gormonal vositalarsiz, o'z tanangizni tinglash orqali
              homiladorlikni rejalashtiring yoki oldini oling. Ilmiy asoslangan
              metodlar bilan o'z salomatligingizni nazorat qiling.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="#pricing">
                <Button
                  size="lg"
                  className="bg-white text-red-800 hover:bg-red-50 text-lg px-10 py-6 rounded-full font-bold shadow-lg"
                >
                  Kursga yozilish
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="about" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
                Nima uchun bizni tanlaysiz?
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Bizning platformamiz ayollarga o'z salomatligini tabiiy va ilmiy
                asoslangan usullar bilan boshqarishga yordam beradi.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Card className="text-center border-red-100/70 h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white/50">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 mb-4 bg-red-100/70 rounded-full flex items-center justify-center">
                        <Shield className="h-8 w-8 text-red-700" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-red-900">
                        Xavfsiz va tabiiy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        Hech qanday kimyoviy preparatlar va yon ta'sirlarsiz,
                        faqat tabiiy usullar orqali o'z tanangizni nazorat
                        qiling.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Course Content Section --- */}
        <section id="courses" className="py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
                Kurs tarkibi
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Har bir modul sizga yangi bilimlar berish va amaliy
                ko'nikmalarni shakllantirish uchun mo'ljallangan.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Card className="border-red-100/80 h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          <img
                            src="/placeholder-user.jpg"
                            alt="Modul spikeri"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-red-900">
                            {i + 1}-MODUL
                          </CardTitle>
                          <p className="text-sm font-medium text-gray-600">
                            Nozima Khamraeva
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            Ayol va erkak reproduktiv tizimi
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            Simptotermal metod darslari
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-red-600 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            Gormonlar va hayot tarzi
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
                Ko'p beriladigan savollar
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Kurs haqida sizni qiziqtirgan savollarga javoblar.
              </p>
            </motion.div>
            <FAQAccordion />
          </div>
        </section>

        {/* --- Pricing Section --- */}
        <section id="pricing" className="py-20 sm:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-red-900 mb-4">
                Tariflar
              </h2>
              <p className="max-w-3xl mx-auto text-lg text-gray-600">
                O'zingizga mos tarifni tanlang va sog'lom hayot sari ilk qadamni
                tashlang.
              </p>
            </motion.div>
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
              {/* STANDART */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="h-full"
              >
                <Card className="border-gray-200 h-full flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">STANDART</CardTitle>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      2.730.000 UZS
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">STM darslari</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Ayollik Fiqhi darslari</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Bonus dars "Yoni-steam"</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          3 oy davomida kurs materiallariga kirish
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          1 to'liq hayz xaritasi kuzatuvi
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Foydalanuvchi Sertifikati (o'rgatish huquqisiz)
                        </span>
                      </li>
                    </ul>
                    <Link href="/register" className="block pt-4">
                      <Button className="w-full bg-red-800 hover:bg-red-900">
                        Sotib olish
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* OPTIMAL */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-full"
              >
                <Card className="border-red-500 relative h-full flex flex-col shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-800">
                    Mashhur
                  </Badge>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-red-900">
                      OPTIMAL
                    </CardTitle>
                    <div className="text-2xl font-bold text-red-800 mb-1">
                      3.510.000 UZS
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">STM darslari</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Ayollik Fiqhi darslari</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Bonus dars "Yoni-steam"</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Juftlar munosabati bo'yicha dars
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          4 oy davomida kurs materiallariga kirish
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          1 to'liq hayz xaritasi kuzatuvi
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Foydalanuvchi Sertifikati (o'rgatish huquqisiz)
                        </span>
                      </li>
                    </ul>
                    <Link href="/register" className="block pt-4">
                      <Button className="w-full bg-red-800 hover:bg-red-900">
                        Sotib olish
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
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full"
              >
                <Card className="border-red-300 h-full flex flex-col hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl text-red-900">VIP</CardTitle>
                    <div className="text-2xl font-bold text-red-800 mb-1">
                      4.550.000 UZS
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">STM darslari</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Ayollik Fiqhi darslari</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Bonus dars "Yoni-steam"</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Juftlar munosabati bo'yicha dars
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Sog'lom Ayollik Sirlari darsi
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          6 oy davomida kurs materiallariga kirish
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          3 to'liq hayz xaritasi kuzatuvi
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">
                          Foydalanuvchi Sertifikati (o'rgatish huquqisiz)
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm font-semibold text-red-600">
                          SOVG'A - ko'p martalik prokladka + maxsus termometr
                        </span>
                      </li>
                    </ul>
                    <Link href="/register" className="block pt-4">
                      <Button className="w-full bg-red-800 hover:bg-red-900">
                        Sotib olish
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="py-20 sm:py-28 bg-red-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Bugun o'z sog'ligingizga g'amxo'rlik qiling!
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Minglab ayollar allaqachon o'z hayotlarini o'zgartirishdi. Siz
                ham qo'shiling!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-red-800 hover:bg-red-50 text-lg px-8 py-6 rounded-full font-bold shadow-lg"
                  >
                    Hoziroq boshlash
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-7 w-7 text-red-500" />
                <h3 className="text-xl font-bold">Uyg'unlik</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Ayollar uchun tabiiy va xavfsiz homiladorlik rejalashtirish
                kurslari.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">
                Tezkor havolalar
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="#courses"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Kurslar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Tariflar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Yordam</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="https://t.me/uygunlik_uz"
                    target="_blank"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Qo'llab-quvvatlash
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Foydalanish shartlari
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Aloqa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="mailto:info@uygunlik.uz"
                    className="hover:text-white transition-colors text-sm"
                  >
                    info@uygunlik.uz
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://t.me/uygunlik_uz"
                    target="_blank"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Telegram: @uygunlik_uz
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Uyg'unlik. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
