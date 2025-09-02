'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import userService from '../../services/user.service';
import { toast } from 'sonner';
import axios from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent, type: 'email' | 'phone') => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Parollar mos kelmadi');
      return;
    }

    const recipient = (type === 'email' ? formData.email : formData.phone).trim();
    const user = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      [type]: recipient,
      password: formData.password,
    };

    try {
      await userService.sendConfirmationCode(recipient, type);
      router.push(
        `/confirm?recipient=${recipient}&type=${type}&user=${JSON.stringify(
          user,
        )}`,
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error("Bu email yoki telefon raqami allaqachon ro'yxatdan o'tgan.");
      } else {
        toast.error("Ro'yxatdan o'tishda xatolik yuz berdi.");
        console.error('Registration failed', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Uyg'unlik</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ro'yxatdan o'tish
          </h2>
          <p className="text-gray-600">
            Kurslarimizga kirish uchun hisob yarating
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Yangi hisob yaratish</CardTitle>
            <CardDescription>
              Ma'lumotlaringizni to'ldiring va kurslarimizdan foydalanishni
              boshlang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">Telefon orqali</TabsTrigger>
                <TabsTrigger value="email">Email orqali</TabsTrigger>
              </TabsList>

              <TabsContent value="phone">
                <form
                  onSubmit={(e) => handleSubmit(e, 'phone')}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ism</Label>
                      <Input
                        id="firstName"
                        placeholder="Ismingiz"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({ ...formData, first_name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Familiya</Label>
                      <Input
                        id="lastName"
                        placeholder="Familiyangiz"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({ ...formData, last_name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon raqami</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+998 90 123 45 67"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Parol</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Parolingizni kiriting"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Parolni qayta kiriting"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    SMS kod yuborish
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="email">
                <form
                  onSubmit={(e) => handleSubmit(e, 'email')}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ism</Label>
                      <Input
                        id="firstName"
                        placeholder="Ismingiz"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({ ...formData, first_name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Familiya</Label>
                      <Input
                        id="lastName"
                        placeholder="Familiyangiz"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({ ...formData, last_name: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email manzil</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Parol</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Parolingizni kiriting"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Parolni qayta kiriting"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Allaqachon hisobingiz bormi?{" "}
                <Link href="/login" className="text-red-600 hover:underline">
                  Kirish
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          Ro'yxatdan o'tish orqali siz bizning{" "}
          <Link href="/terms" className="text-red-600 hover:underline">
            Foydalanish shartlari
          </Link>{" "}
          va{" "}
          <Link href="/privacy" className="text-red-600 hover:underline">
            Maxfiylik siyosati
          </Link>
          ga rozilik bildirasiz.
        </div>
      </div>
    </div>
  );
}

