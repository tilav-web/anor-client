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
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/user.store";

// Reviews Carousel komponenti
const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Asiya Ameen",
      handle: "@Ameenasiyaa",
      initial: "A",
      text: "Bismillah! Kurs haqidagi taassurotlarim judayam ijobiy. Uzoq yozib o'tirmiyman, bitta qilib etganda manga bu kurs bergan eng ASOSIY narsa ANIQLIK bo'ldi. Ko'nglim shunaqangi hotirjamki endi nimani qachon qanaqa qilish kereligini bilaman. O'z sog'ligimga zarar qilib saqlanuvchi vositalardan davomiy foydalanishdan qutulganimga va tanamga avvalgidan ko'ra ko'proq yaqinlashganimga o'zimni judayam yaxshi his qivomman..."
    },
    {
      name: "Dildora Baxtiyorovna",
      handle: "@hafiza_am",
      initial: "D",
      text: "Tabiiylikka avvaldan qiziqardim lekin sizni darslarizdan keyin organizmimiz naqadar mukammal ekanligini va biz sezmagan ahamiyat bermagan holatda ichimizda qancha o'zgarishlar, naslni davom ettrish uchun kurashlar bo'lib o'tar ekanligini bildim. Shunchaki hayratdaman.Biz esa faqat va faqat o'zimizni noqis aqlimiz bilan mukammal tizimga qanaqdir simlar (spiral) tiqib bu jarayonni toxtatmoqchi bolamiz. Aslida shunchaki tanamizni eshitish biroz etiborli bo'lish va qanday yaratilgan bolsak shunday yashab bersak boldi ekan❤❤..."
    },
    {
      name: "Elnora Rustamova",
      handle: "@RusstamvaM",
      initial: "E",
      text: "Assalamu Alaykum va rahmatullohi va barakatuh. Avvalosi Ummu Umayr darsida aytib o'tganidek Niyat To'gri qilib 2 dunyomizga manfaatli bo'lishni so'rab qolaman. darslar judayam tushinarli tilda har hil katta tushinarsiz jumlalarsiz yoritib berilgan. Ayniqsa manga yoqgani birinchi kirish darsini animatsiyalari xuddi miyyamga chizilganday yodimda qoldi. Bu darslarni har bir ayol bilishi kerak deb o'ylayman..."
    },
    {
      name: "Xadicha Jo'rayeva",
      handle: "@zxadicha",
      initial: "X",
      text: "Hayz haqida ma'lumotlar, ayniqsa uni kasallik emas, ona bo'lish qobilyati ekanini eslatganiz yoqdi. Man birinchi hayzimni ko'rganimda qo'rqib ketganman, nimaligini bilmaganman. Buni yomon ish dib o'ylaganman. Hammadan yashirganman. Shu bilan 18-20 yoshimgacha siklim umuman buzilib ketgan. Endi tartibga keldi. Mana shu travmacham esimga tushdi. Hayz haqida shar'iy va tibbiy bilimga birinchi o'rinda ega bo'lishimiz kerak boshqa bilimladan oldin. Mana shu narsani tushundim. Karta yuritish esa qiyin emas qiziqarli tuyildi manga. Organizmimdagi ruhiy, jismoniy holatni chizma varianti desa bo'larkan. Bizani hissiy holatimiz, sog'ligimiz kartamizda..."
    },
    {
      name: "Robiya Muhammedova",
      handle: "@uxti_ra",
      initial: "R",
      text: "Ассаламу алейкум ва рахматуллоҳи ва барокатух 👋 Нозимапа ман сизга шунчеки курсмас, балки ўз ҳаётимми, саломатлигимми ва аёллик ҳақида чуқурроқ тушунишимми таъминлаган, ҳақиқий билим манбаига айланган котта имконият учун миннатдорлик билдирмоқчиман. Бу курсга қатнашиш довомида аёлларни овуляция бўлиш ва бўлмаслиги вақти, естроген ва прогестерон даврлари ҳақида кенг ва асосли билимлани ўргандим. Бу билимла ман учун шунчеки маълумотмас, балки ўзимми ички органларимми..."
    },
    {
      name: "Ummu Muhsin",
      handle: "@toolibah_",
      initial: "U",
      text: "Har bitta darssi ko'rganimda ko'zimdan yulduzchala chiqadi, taassurotlarim judayam ko'p. Qisqa qib etadigan bo'sam, stm darsi har bitta ayol kishi bilishi kere bo'gan ilmligiga amin bo'ldim, bu faqatgina homiladorlidan saqlanishshi o'zimas, ayollaga tanasi bn aloqa o'rnatish, o'ziga ahamiyatli bo'lish, sog'lig'i haqida qayg'urishshi o'rgatarkan va homilador bo'moqchi bo'ganla uchunam ayni muddao. Darsla qiziqarli va oson qib chuntirilgan, ayniqsa animatsiyala mavzuni yanayam aniqro chunishga yordam berdi. Vaaa gap ayollik haqida ketvotkanakan, kursda faqatgina stm ni o'zimas, fiqh..."
    },
    {
      name: "Muhammad's wife",
      handle: "@zavjatuM",
      initial: "M",
      text: "Assalamu alaykum Nozima opa darsliklar juda sifatli tayyorlangan ozimni anchagina angladim ozimni kuzatishni organdim tahlil qilishni ham. Avvalgi homiladorlik vaqtimda bolgan muammolarni sababini bilmasdim tabiiyki vrachlar ham tushuntirib bermagan edi har bir darslikda man homilador vaqtimda bolgan muammolarni ildizini ham topdim va keyingi homilada albatta buni oz nazoratimga olaman deb niyat qildim. Kurs faqat saqlanish emas balki ongli ravishda farzandli bolish va tugruqqa tayarlov..."
    },
    {
      name: "Aisha Shoakmalova",
      handle: "@shoakmalova_a",
      initial: "A",
      text: "Kursda qatnashishdan maqsad stm haqidagi bilimlarni qaytarish, yangilash va puxtalash edi... Lekin aslida bundan avvalgi kursim stmga progrev bo'lgandek tuyylib qoldi to'g'risi. Savollarimga aqlim qoniqadigan darajada javob ololyotganimdan judayam hursand bo'vomman, darslarga alohida mehr berib o'tilishi shundoq sezilib turibdi, mazza qilib ko'raman. Qo'shimcha materiallarni aytmasam xato qilgan bölaman..."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // 5 soniya

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: -currentIndex * 100 + "%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white p-8 rounded-lg shadow-md border border-red-100 text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-xl">{review.initial}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 text-lg">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.handle}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  "{review.text}"
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-red-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// FAQ Accordion komponenti
const FAQAccordion = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Metod qanchalik ishonchli? Homilador bo'lib qolmaymanmi?",
      answer: "Fertillikni kuzatishning Simptotermal Metodi ilmiy tadqiqotlar bo'yicha 99,6% aniqlikka ega. Foydalanuvchi kuzatuv ishlarini doimiy va aniq olib borsa, ko'zlangan maqsadga erishiladi. Agar Foydalanuvchi kuzatuv ishlarini to'liq amalga oshirmasa, xatolik (saqlanishni ko'zda tutganlarda - homiladorlik) yuzaga kelsa - bu faqatgina juftlikning zimmasida bo'ladi, metoddagi kamchilikda emas."
    },
    {
      question: "Spiralim bor, kursda qatnashish uchun oldirishim kerakmi?",
      answer: "Ha, kurs boshlanishidan oldin spiralni oldirgan, garmonal tabletkalar qabul qilsangiz, ularni ichishni to'xtatgan bo'lishingiz kerak."
    },
    {
      question: "Metodni tug'ruqdan keyin, hayz ko'rmay turib ham, emizikli davrda qo'llay olamanmi?",
      answer: "Albatta. Kuzatuvlarga asoslanib, barcha ayollar tug'ruqdan keyingi 3 haftada fertil (unumdor) bo'lmasliklari aniqlangan. Undan keyingi davrda, emizishning to'liq yoki aralash ekanligiga qarab, STM qoidalari bo'yicha kuzatuvni boshlashingiz mumkin."
    },
    {
      question: "Hali turmushga chiqmagan qiz bolaman. Kurs men uchun foydali bo'ladimi?",
      answer: "Bu kursda har bir qiz va ayol bilishi shart bo'lgan hayz ilmi, o'ziga g'amxo'rlik qilish, hayz davrining har kunida - tana, hissiyotlar, va garmonlardagi tabiiy o'zgarishlarni kuzatish va tushunish kabi muhim bilimlar beriladi. Turmush qurishdan avval o'z tanangizni, ayollik tabiatingizni chuqurroq anglab, uning ritmiga mos yashashni o'rganish - bo'lajak sog'lom homiladorlikka tayyorgarlik bo'lishi bilan birga, kelajakda dunyoga keladigan qiz farzandingiz tarbiyasida ham bebaho poydevor bo'lib xizmat qiladi. Bu - nafaqat bugungi salomatligingizga, balki ertangi avlodingizga ham qaratilgan eng dono sarmoyalardan biridir."
    },
    {
      question: "Homiladorman, kursda ishtirok etsam bo'ladimi?",
      answer: "Homiladorlik har bir ayol uchun ajoyib davr. Bu vaqtni to'laligicha sog'lom tug'ruqqa tayyorlanish, bolaning ilk kunlaridagi parvarish va to'g'ri emizishga qaratganingiz afzal. Agar, 40 kun chilla davridan keyin, o'zingizni tayyor deb hisoblasangiz, kursda qatnashish uchun murojaat qilishingiz mumkin."
    },
    {
      question: "Metodni qo'llashda maxsus termometr kerakmi? Termometrda doimiy o'lchash shartmi?",
      answer: "Metod o'z nomi bilan \"simpto\" - belgi, \"termal\" - harorat, bo'lgani uchun, haroratingizni doimiy o'lchash juda muhim. Buning uchun maxsus termometrlar bor, lekin topolmasangiz, oddiy simob termometrdan ham foydalansangiz bo'ladi."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md border border-red-100 overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full p-6 text-left flex items-center justify-between hover:bg-red-50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-red-800 pr-4">
              {item.question}
            </h3>
            <div className="flex-shrink-0">
              {openItems.includes(index) ? (
                <Minus className="h-6 w-6 text-red-600" />
              ) : (
                <Plus className="h-6 w-6 text-red-600" />
              )}
            </div>
          </button>
          
          {openItems.includes(index) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <p className="text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

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
            <h1 className="text-2xl font-bold text-red-900">Kurs Platformasi</h1>
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
              alt=""
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
              <Link href="#pricing">
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
            Nima uchun bizni tanlaysiz?
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

      {/* Course Content */}
      <section id="courses" className="py-16 px-4 bg-red-50">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            KURS TARKIBI
          </motion.h2>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {/* I MODUL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src="/placeholder-user.jpg" 
                        alt="Nozima Khamraeva"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-red-900 text-lg">
                        I MODUL
                  </CardTitle>
                      <CardDescription className="font-semibold text-gray-700">
                        Nozima Khamraeva
                      </CardDescription>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    Buyuk Britaniya "Natural Family Planning Teachers' Association" uyushmasining sertifikatli treneri.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">Videodarslar (20-30 daq.):</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Ayol va erkak reproduktiv tizimining anatomiya va fiziologiyasi</span>
                    </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Simptotermal metod darslari</span>
                    </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Gormonlar, hayot tarzi va hayz ritmida yashash</span>
                    </li>
                  </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* II MODUL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src="/placeholder-user.jpg" 
                        alt="Sumayya Hanafi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-red-900 text-lg">
                        II MODUL
                  </CardTitle>
                      <CardDescription className="font-semibold text-gray-700">
                        Sumayya Hanafi
                      </CardDescription>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    Islom fiqhi bo'yicha mutaxassis, Iordaniya qirolligida Usul va Fiqh yo'nalishida bakalavr darajasiga ega.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">Videodarslar (10-15 daq.):</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Ayollik fiqhini o'rganish ahamiyati</span>
                    </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Hayz, istihoza, nifos tushunchalari</span>
                    </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Tahorat, g'usl, oq ajralmalar haqida</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Er bilan yaqinlik masalalari</span>
                    </li>
                  </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* III MODUL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src="/placeholder-user.jpg" 
                        alt="Ummu Umayr"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-red-900 text-lg">
                        III MODUL
                  </CardTitle>
                      <CardDescription className="font-semibold text-gray-700">
                        Ummu Umayr
                      </CardDescription>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    Diplomli psixolog-seksolog, integrativ nutritsiolog. 15+ kurs va loyihalar asoschisi; 2000+ ayol-qizlarni ijobiy natijaga olib chiqqan mutaxassis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">Videodarslik (35 daq.):</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Ruhiy va jismoniy omillarning ahamiyati</span>
                    </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">To'shak masalasidagi kelishmovchiliklar</span>
                    </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Jinsiy hayotga tabiiy saqlanishning ijobiy ta'sirlari</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Tabiiy saqlanish kunlari uchun tavsiyalar</span>
                    </li>
                  </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* IV MODUL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src="/placeholder-user.jpg" 
                        alt="Sohiba Abdalniyozova"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-red-900 text-lg">
                        IV MODUL
                  </CardTitle>
                      <CardDescription className="font-semibold text-gray-700">
                        Sohiba Abdalniyozova
                      </CardDescription>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    Doula, prenatal nutritsiolog. Ayollarga homiladorlik, oson tug'ruq va tug'ruqdan keyingi tiklanishga yordam beradigan mutaxassis.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">Videodarslik (25 daqiqa):</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Yoni-steam foydalari va uni uy sharoitida qilish</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Oyoq parlash ahamiyati</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* V MODUL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="md:col-span-2 lg:col-span-1"
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      <img 
                        src="/placeholder-user.jpg" 
                        alt="Ruvayha"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-red-900 text-lg">
                        V MODUL
                      </CardTitle>
                      <CardDescription className="font-semibold text-gray-700">
                        Ruvayha
                      </CardDescription>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-600">
                    Diplom va sertifikatli Tabiiy Tibbiyot yo'lovchisi, doula, tug'ruqqa tayyorlovchi murabbiy, gomeopat.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">Videodarslik (40 daqiqa):</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm">Sog'lom ayol bo'lish sirlari</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kurs Kimlar Uchun */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            KURS KIMLAR UCHUN?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 1. Doimiy xavotirda yashaydigan ayollar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <CardTitle className="text-red-900 text-center">
                    Doimiy xavotirda yashaydigan ayollar uchun
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Users className="h-12 w-12 text-red-800" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Tabiiy yo'llar bilan homiladorlikdan saqlanishni xohlaysiz, lekin zararli kontrasepsiya vositalaridan foydalanishdan qo'rqasizmi? Simptotermal metod (STM) yordamida:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">99.6% aniqlik bilan homiladorlikdan saqlanishni o'rganasiz.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Tanangiz, kayfiyatingizdagi o'zgarishlar va hayz davringizni tushuna boshlaysiz</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Hayzingiz qachon boshlanishini aniq bilib, stressiz yashaysiz.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Juftingiz bilan ishonchli va ochiq munosabatlar o'rnatishga erishasiz.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* 2. Homilador bo'lishni xohlayotgan ayollar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <CardTitle className="text-red-900 text-center">
                    Homilador bo'lishni xohlayotgan, ammo qiyinchiliklarga duch kelayotgan ayollar uchun
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Heart className="h-12 w-12 text-red-800" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Agar sizga aniq bepushtlik tashxisi qo'yilmagan bo'lsa, STM orqali tabiiy usulda farzandli bo'lish imkoniyatini oshirishingiz mumkin:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Eng yuqori ehtimolli homiladorlik kunlarini aniqlaysiz.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Homiladorlikning dastlabki 10 haftasida tanangiz resurslarini kuzatib borasiz.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Tug'ish sanangizni homiladorlik yuzaga kelgan kundan boshlab hisoblay olasiz</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* 3. Yaqinda ona bo'lgan ayollar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="border-red-200 h-full">
                <CardHeader>
                  <CardTitle className="text-red-900 text-center">
                    Yaqinda ona bo'lgan va darhol homilador bo'lishni istamaydigan ayollar uchun
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Award className="h-12 w-12 text-red-800" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Ko'plab emizikli onalar «emizish homiladorlikdan saqlaydi» degan noto'g'ri tushunchaga ega. STM yordamida siz:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Hayzingiz hali tiklanmagan bo'lsa ham, 99.6% aniqlik bilan, keyingi homiladorlikni rejalashtira olasiz</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Tug'ruqdan keyingi birinchi ovulyatsiyangizni kuzatasiz.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-red-800 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Organizmga zarar yetkazmaydigan va juftingiz bilan ishonchli munosabatda bo'lish imkonini beradigan tabiiy usuldan foydalanasiz.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ilmiy Asoslangan Samaradorlik */}
      <section className="py-16 px-4 bg-red-50">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            ILMIY ASOSLANGAN SAMARADORLIK
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Chap qism: Ideal va Oddiy qo'llashda */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                {/* Ideal qo'llashda */}
                <Card className="border-red-200 bg-white">
                  <CardHeader className="text-center">
                    <CardTitle className="text-red-900 text-xl mb-2">
                      Ideal qo'llashda
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Har bir tavsiyaga qat'iy amal qilinganda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-6xl font-bold text-red-800 mb-2">99,6%</div>
                    <p className="text-sm text-gray-600 mb-2">
                      (Pearl ko'rsatkichi: 0,4)
                    </p>
                    <p className="text-xs text-gray-500">
                      Manba: Human Reproduction, 2007
                    </p>
                  </CardContent>
                </Card>

                {/* Oddiy qo'llashda */}
                <Card className="border-red-200 bg-white">
                  <CardHeader className="text-center">
                    <CardTitle className="text-red-900 text-xl mb-2">
                      Oddiy qo'llashda
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Qo'llashda kamchiliklarga yo'l qo'yilganda
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-6xl font-bold text-red-800 mb-2">98,2%</div>
                    <p className="text-sm text-gray-600 mb-2">
                      (Pearl ko'rsatkichi: 1,8)
                    </p>
                    <p className="text-xs text-gray-500">
                      Manba: Osteopath Fam Physician, 2013
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* O'ng qism: Taqqoslash */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-red-200 bg-white h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-red-900 text-xl mb-2">
                    Taqqoslash
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    (oddiy foydalanish)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Grafik */}
                  <div className="mb-6">
                    <div className="flex items-end justify-between h-32 bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-20 bg-red-300 rounded-t"></div>
                        <span className="text-xs mt-2">15</span>
                        <span className="text-xs text-gray-600">Prezervativ</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-12 bg-red-400 rounded-t"></div>
                        <span className="text-xs mt-2">9</span>
                        <span className="text-xs text-gray-600">Gormonal</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-red-600 rounded-t"></div>
                        <span className="text-xs mt-2">1.8</span>
                        <span className="text-xs text-gray-600">STM</span>
                      </div>
                    </div>
                  </div>

                  {/* Jadval */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="font-semibold text-gray-700">Usul</div>
                      <div className="font-semibold text-gray-700">Pearl ko'rsatkichi</div>
                      <div className="font-semibold text-gray-700">Samaradorlik</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center py-2 border-t">
                      <div className="text-sm">Prezervativ</div>
                      <div className="text-sm font-semibold text-red-600">15</div>
                      <div className="text-sm font-semibold text-red-600">85%</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center py-2 border-t">
                      <div className="text-sm">Gormonal tabletkalar</div>
                      <div className="text-sm font-semibold text-red-600">9</div>
                      <div className="text-sm font-semibold text-red-600">91%</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center py-2 border-t bg-red-50 rounded">
                      <div className="text-sm font-semibold">Simptotermal usul</div>
                      <div className="text-sm font-bold text-red-800">1.8</div>
                      <div className="text-sm font-bold text-red-800">98.2%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kurs Muallifi */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Kurs muallifi
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            {/* Chap qism: Portret va ma'lumotlar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
            >
              <div className="mb-8">
                <div className="w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden bg-gray-200 mb-6">
                  <img 
                    src="/placeholder-user.jpg" 
                    alt="Nozima Khamraeva"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-2">Kurs muallifi</h3>
                <h4 className="text-3xl font-bold text-red-800 mb-6">Nozima Khamraeva</h4>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg leading-relaxed">
                  Buyuk Britaniya "Natural Family Planning Teachers' Association" uyushmasining sertifikatli treneri.
                </p>
                <p className="text-lg leading-relaxed">
                  O'zbekistonda ilk marotaba ayollar uchun ko'p martalik matoli tagliklarni tanishtirgan ayol.
                </p>
                <p className="text-lg leading-relaxed">
                  Uchinchi farzandini tibbiy aralashuvlarsiz, ongli yondashib uyda dunyoga keltirgan ona.
                </p>
              </div>
            </motion.div>

            {/* O'ng qism: Sertifikat */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <Card className="border-red-200 bg-white shadow-lg max-w-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    {/* Sertifikat header */}
                    <div className="mb-6">
                      <div className="text-blue-600 font-bold text-lg mb-2">NFP</div>
                      <div className="text-sm text-gray-600 mb-4">
                        Natural Family Planning Teachers' Association
                      </div>
                    </div>
                    
                    {/* Sertifikat sarlavhasi */}
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      Certificate of Theory
                    </h3>
                    
                    {/* Sertifikat egasi */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">This is to certify that</p>
                      <p className="text-lg font-bold text-gray-800">Nozima Khamraeva</p>
                    </div>
                    
                    {/* Sertifikat mazmuni */}
                    <div className="mb-6 text-sm text-gray-700 leading-relaxed">
                      <p>
                        has passed the examination in Theoretical Knowledge and Understanding of Natural Family Planning on the 2024 Distance Learning Teacher Training Course
                      </p>
                    </div>
                    
                    {/* Imzo */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Signed</p>
                      <div className="border-b border-gray-300 mb-2"></div>
                      <p className="text-sm text-gray-600">Olive Duddy MB CHB MRCGP</p>
                      <p className="text-sm text-gray-600">C. Burgess (Tutor)</p>
                    </div>
                    
                    {/* Sana */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Date: 31st May 2024</p>
                    </div>
                    
                    {/* Pastki logotip */}
                    <div className="text-xs text-gray-500">
                      <p>The NFPtA is also a member of the</p>
                      <p>INSTITUT EUROPÉEN D'EDUCATION FAMILIALE</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Savol-Javoblar (FAQ) */}
      <section className="py-16 px-4 bg-red-50">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            ENG KO'P BERILADIGAN SAVOLLAR
          </motion.h2>

          <FAQAccordion />
        </div>
      </section>

      {/* Sharhlar */}
      <section className="py-16 px-4 bg-red-50">
        <div className="container mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-red-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            SHARHLAR
          </motion.h2>

          <ReviewsCarousel />
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
            TARIFLAR
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* STANDART */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-gray-200 h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">STANDART</CardTitle>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    2.730.000 UZS
                  </div>
                  <div className="text-lg text-gray-600 mb-2">
                    210$
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <span className="text-sm">3 oy davomida kurs materiallariga kirish</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">1 to'liq hayz xaritasi kuzatuvi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Foydalanuvchi Sertifikati (o'rgatish huquqisiz)</span>
                    </li>
                  </ul>
                  <Link href="/register" className="block">
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
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-red-500 relative h-full">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-800">
                  Mashhur
                </Badge>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-red-900">
                    OPTIMAL
                  </CardTitle>
                  <div className="text-2xl font-bold text-red-800 mb-1">
                    3.510.000 UZS
                  </div>
                  <div className="text-lg text-gray-600 mb-2">
                    270$
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <span className="text-sm">Juftlar munosabati bo'yicha dars</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">4 oy davomida kurs materiallariga kirish</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">1 to'liq hayz xaritasi kuzatuvi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Foydalanuvchi Sertifikati (o'rgatish huquqisiz)</span>
                    </li>
                  </ul>
                  <Link href="/register" className="block">
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
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-red-300 h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-red-900">VIP</CardTitle>
                  <div className="text-2xl font-bold text-red-800 mb-1">
                    4.550.000 UZS
                  </div>
                  <div className="text-lg text-gray-600 mb-2">
                    350$
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <span className="text-sm">Juftlar munosabati bo'yicha dars</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Sog'lom Ayollik Sirlari darsi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">6 oy davomida kurs materiallariga kirish</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">3 to'liq hayz xaritasi kuzatuvi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm">Foydalanuvchi Sertifikati (o'rgatish huquqisiz)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-sm font-semibold text-red-600">SOVG'A - ko'p martalik prokladka + maxsus termometr</span>
                    </li>
                  </ul>
                  <Link href="/register" className="block">
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
                <h3 className="text-xl font-bold">Uyg'unlik platformasi</h3>
              </div>
              <p className="text-gray-400">
                Ayollar uchun tabiiy va xavfsiz homiladorlik rejalashtirish
                kurslari.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kurslar</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/course/1" className="hover:text-white transition-colors">
                    Asosiy kurs
                  </Link>
                </li>
                <li>
                  <Link href="/course/2" className="hover:text-white transition-colors">
                    Ilg'or usullar
                  </Link>
                </li>
                <li>
                  <Link href="/course/3" className="hover:text-white transition-colors">
                    Amaliy mashg'ulotlar
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yordam</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/uygunlik_uz" target="_blank" className="hover:text-white transition-colors">
                    Qo'llab-quvvatlash
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/uygunlik_uz" target="_blank" className="hover:text-white transition-colors">
                    Bog'lanish
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Aloqa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="tel:+998901234567" className="hover:text-white transition-colors">
                    +998 90 123 45 67
                  </Link>
                </li>
                <li>
                  <Link href="mailto:info@uygunlik.uz" className="hover:text-white transition-colors">
                    info@uygunlik.uz
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/uygunlik_uz" target="_blank" className="hover:text-white transition-colors">
                    Telegram: @uygunlik_uz
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kurs Platformasi. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
