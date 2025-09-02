"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import { Role } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  BookOpen,
  Settings,
  Play,
  CheckCircle,
  Clock,
  Download,
  Star,
} from "lucide-react";
import Link from "next/link";
import CourseService from "@/services/course.service";
import { Course } from "@/types/course";
import { Video } from "@/types/video";

// Extend Video type to include frontend-specific properties for dashboard display
interface DashboardVideo extends Video {
  completed: boolean;
  module: number; // Simplified module assignment for display
}

export default function DashboardPage() {
  const { user } = useUserStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<DashboardVideo[]>([]);
  const [activeTab, setActiveTab] = useState("courses");

  // Derived state for userInfo and courseProgress based on fetched data and user store
  const userInfo = {
    name: user ? `${user.first_name} ${user.last_name}` : "Foydalanuvchi",
    email: user?.email || "email@example.com",
    phone: user?.phone || "+998 90 123 45 67",
    balance: user?.balance || 0, // Use actual balance from user store
    plan: "Optimal", // Still mock, as it's not in the User schema
    planExpiry: "2024-06-15", // Still mock
    joinDate: "2024-01-15", // Still mock
  };

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const progressPercentage =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Simplified current module logic
  const currentModule =
    lessons.find((lesson) => !lesson.completed)?.module || 1;
  const totalModules = Math.max(...lessons.map((l) => l.module), 1);

  useEffect(() => {
    if (user === undefined) {
      setLoading(true); // Still loading user data
      return;
    }

    if (user === null) {
      router.push("/login"); // Not logged in
      return;
    }

    if (user.role === Role.ADMIN) {
      router.push("/admin"); // Admin should go to admin page
      return;
    } else if (user.role !== Role.USER) {
      router.push("/login"); // Not a user, redirect to login (or a generic unauthorized page)
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const fetchedCourses = await CourseService.findAll();
        setCourses(fetchedCourses);

        let allVideos: DashboardVideo[] = [];
        let moduleCounter = 1;
        fetchedCourses.forEach((course) => {
          course.videos.forEach((video, index) => {
            // Simulate completion and module for demonstration
            allVideos.push({
              ...video,
              completed: Math.random() > 0.5, // Randomly mark as completed
              module: moduleCounter, // Simple module assignment
            });
            // Increment module counter for every few videos or based on course structure
            if ((index + 1) % 3 === 0) {
              // Example: new module every 3 videos
              moduleCounter++;
            }
          });
        });
        setLessons(allVideos);
      } catch (error) {
        console.error("Dashboard ma'lumotlarini yuklashda xato:", error);
        // Handle error, e.g., show a toast notification
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-700">Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Uyg'unlik</h1>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {userInfo.plan} tarif
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Sozlamalar
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Xush kelibsiz, {userInfo.name}!
          </h1>
          <p className="text-gray-600">
            Kurslaringizni davom ettiring va yangi bilimlar oling
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tugallangan darslar</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {completedLessons}/{totalLessons}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Joriy modul</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {currentModule}/{totalModules}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Umumiy progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(progressPercentage)}%
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Balans</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {userInfo.balance.toLocaleString()} so'm
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-lineca="round" stroke-linejoin="round" className="lucide lucide-wallet h-8 w-8 text-purple-600"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h12a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h12a2 2 0 0 0 2-2v-3"/><path d="M22 7V4a1 1 0 0 0-1-1H3a2 2 0 0 0 0 4h18a2 2 0 0 1 0 4H3a2 2 0 0 0 0 4h18a2 2 0 0 0 2-2v-3"/><path d="M3 7V4a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v3"/><path d="M21 11V8a1 1 0 0 1 1-1h-2"/><path d="M7 12h1"/></svg>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tarif amal qiladi</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {userInfo.planExpiry} gacha
                  </p>
                </div>
                <Clock className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="courses">Kurslarim</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="payments">To'lovlar</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Course Progress */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Kurs jarayoni</CardTitle>
                    <CardDescription>
                      Sizning hozirgi progressingiz va keyingi darslar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Umumiy progress
                        </span>
                        <span className="text-sm text-gray-600">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                          <div
                            key={lesson._id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  lesson.completed
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-400"
                                }`}
                              >
                                {lesson.completed ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {lesson.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  Modul {lesson.module} •{" "}
                                  {lesson.duration
                                    ? `${lesson.duration} min`
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={lesson.completed ? "outline" : "default"}
                              className={
                                lesson.completed
                                  ? ""
                                  : "bg-red-600 hover:bg-red-700"
                              }
                            >
                              {lesson.completed ? "Qayta ko'rish" : "Boshlash"}
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">
                          Hozircha darslar mavjud emas.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Current Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle>Joriy tarif</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <Badge className="mb-2 bg-red-100 text-red-800">
                        {userInfo.plan}
                      </Badge>
                      <p className="text-sm text-gray-600 mb-4">
                        Amal qiladi: {userInfo.planExpiry} gacha
                      </p>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Tarifni o'zgartirish
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
                <CardDescription>
                  Hisobingiz va shaxsiy ma'lumotlaringizni boshqaring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      To'liq ism
                    </label>
                    <p className="mt-1 text-gray-900">{userInfo.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{userInfo.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Telefon
                    </label>
                    <p className="mt-1 text-gray-900">{userInfo.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Ro'yxatdan o'tgan sana
                    </label>
                    <p className="mt-1 text-gray-900">{userInfo.joinDate}</p>
                  </div>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  Ma'lumotlarni o'zgartirish
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>To'lov tarixi</CardTitle>
                <CardDescription>
                  Barcha to'lovlaringiz va hisob-kitoblar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Optimal tarif</h4>
                      <p className="text-sm text-gray-600">15.01.2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">499,000 so'm</p>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        To'langan
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
