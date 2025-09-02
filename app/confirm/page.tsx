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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import userService from '../../services/user.service';

export default function ConfirmPage() {
  const [otp, setOtp] = useState('');
  const searchParams = useSearchParams();
  const recipient = searchParams.get('recipient');
  const type = searchParams.get('type');
  const user = searchParams.get('user');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipient && type && user) {
      try {
        const cleanedRecipient = `+${recipient.trim()}`;
        const parsedUser = JSON.parse(user);
        if (parsedUser.phone) {
            parsedUser.phone = parsedUser.phone.trim();
        }
        if (parsedUser.email) {
            parsedUser.email = parsedUser.email.trim();
        }
        await userService.confirmRegistration(cleanedRecipient, otp, parsedUser);
        // Redirect to a protected page or show a success message
        window.location.href = '/';
      } catch (error) {
        console.error('Confirmation failed', error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Uyg'unlik</h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tasdiqlash kodi
          </h2>
          <p className="text-gray-600">
            {type === 'email' ? 'Emailingizga' : 'Telefon raqamingizga'} yuborilgan
            tasdiqlash kodini kiriting.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kodni tasdiqlang</CardTitle>
            <CardDescription>6 xonali kod</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Tasdiqlash
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
