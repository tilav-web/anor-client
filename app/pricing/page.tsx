"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, CheckCircle, X } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Standart",
      price: "299,000",
      description: "Asosiy kurs materiallari",
      features: [
        "4 ta asosiy modul",
        "20+ video dars",
        "PDF materiallar",
        "3 oy kirish huquqi",
        "Asosiy qo'llab-quvvatlash",
      ],
      notIncluded: ["Bonus darslar", "Shaxsiy konsultatsiya", "Telegram guruh", "Sertifikat"],
      popular: false,
      buttonText: "Tanlash",
      buttonClass: "bg-gray-600 hover:bg-gray-700",
    },
    {
      name: "Optimal",
      price: "499,000",
      description: "Qo'shimcha materiallar bilan",
      features: [
        "Standart tarifning barchasi",
        "Bonus darslar",
        "Interaktiv testlar",
        "6 oy kirish huquqi",
        "Email qo'llab-quvvatlash",
        "Kengaytirilgan materiallar",
      ],
      notIncluded: ["Shaxsiy konsultatsiya", "Telegram guruh"],
      popular: true,
      buttonText: "Tanlash",
      buttonClass: "bg-red-600 hover:bg-red-700",
    },
    {
      name: "VIP",
      price: "799,000",
      description: "To'liq qo'llab-quvvatlash",
      features: [
        "Optimal tarifning barchasi",
        "Maxsus VIP darslar",
        "1 yil kirish huquqi",
        "Shaxsiy konsultatsiya",
        "Telegram guruh",
        "Sertifikat",
        "Doimiy qo'llab-quvvatlash",
        "Birinchi bo'lib yangi materiallar",
      ],
      notIncluded: [],
      popular: false,
      buttonText: "Tanlash",
      buttonClass: "bg-red-600 hover:bg-red-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Uyg'unlik</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-red-600">
              Bosh sahifa
            </Link>
            <Link href="/#courses" className="text-gray-600 hover:text-red-600">
              Kurslar
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-red-600">
              Kirish
            </Link>
            <Link href="/register">
              <Button className="bg-red-600 hover:bg-red-700">Ro'yxatdan o'tish</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">O'zingizga mos tarifni tanlang</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Har bir tarif sizning ehtiyojlaringizga moslashtirilgan. Qaysi birini tanlasangiz ham, sifatli ta'lim va
            qo'llab-quvvatlash kafolatlanadi.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-red-500 shadow-lg scale-105" : "border-gray-200"}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white">
                  Eng mashhur
                </Badge>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className={`text-2xl ${plan.popular ? "text-red-900" : "text-gray-900"}`}>
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-red-600" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">so'm</span>
                </div>
                <CardDescription className="mt-2 text-base">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Included Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Kiritilgan:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included Features */}
                {plan.notIncluded.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Kiritilmagan:</h4>
                    <ul className="space-y-2">
                      {plan.notIncluded.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <X className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Link href="/register" className="block">
                  <Button className={`w-full text-lg py-3 ${plan.buttonClass}`}>{plan.buttonText}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tez-tez so'raladigan savollar</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">To'lov qanday amalga oshiriladi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Siz Payme, Click, Uzum yoki bank kartasi orqali to'lov qilishingiz mumkin. To'lov xavfsiz va tezkor
                  amalga oshiriladi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kursga kirish qachon ochiladi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To'lovingiz tasdiqlangandan so'ng darhol kursga kirish huquqi beriladi. Odatda bu 1-2 soat ichida
                  amalga oshadi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tarifni keyinroq o'zgartirish mumkinmi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ha, istalgan vaqtda yuqori tarifga o'tishingiz mumkin. Farqni to'lab, qo'shimcha imkoniyatlardan
                  foydalanishni boshlaysiz.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pulni qaytarish mumkinmi?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  To'lovdan keyin 7 kun ichida, agar kursdan foydalanmagan bo'lsangiz, pulni qaytarish mumkin.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hali ham ikkilanayapsizmi?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Bizning mutaxassislarimiz bilan bog'laning va barcha savollaringizga javob oling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
              Biz bilan bog'lanish
            </Button>
            <Link href="/register">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                Hoziroq boshlash
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
