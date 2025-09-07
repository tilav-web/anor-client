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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import UserService from "@/services/user.service";
import { Course } from "@/types/course";
import { Video } from "@/types/video";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Extend Video type to include frontend-specific properties for dashboard display
interface DashboardVideo extends Video {
  completed: boolean;
  module: number; // Simplified module assignment for display
}

export default function DashboardPage() {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    first_name: z
      .string()
      .min(2, { message: "Ism kamida 2 harfdan iborat bo'lishi kerak." }),
    last_name: z
      .string()
      .min(2, { message: "Familiya kamida 2 harfdan iborat bo'lishi kerak." }),
    email: z.string().email({ message: "Noto'g'ri email format." }),
    phone: z.string().min(9, { message: "Noto'g'ri telefon raqam format." }),
    password: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedUser = await UserService.updateProfile(values);
      setUser(updatedUser);
      toast({
        title: "Muvaffaqiyatli!",
        description: "Ma'lumotlaringiz muvaffaqiyatli o'zgartirildi.",
      });
    } catch (error) {
      toast({
        title: "Xatolik!",
        description: "Ma'lumotlarni o'zgartirishda xatolik yuz berdi.",
        variant: "destructive",
      });
    }
  }

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

  if (loading || !user) {
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

        

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="courses">Kurslarim</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="payments">To'lovlar</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <Accordion type="single" collapsible className="w-full">
              {user?.courses?.map((course) => (
                <AccordionItem value={course._id} key={course._id}>
                  <AccordionTrigger>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold">{course.title}</span>
                      <span className="text-sm text-gray-500">{course.description}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {course.videos.map((video) => (
                        <div
                          key={video._id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-400`}
                            >
                              <Play className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {video.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {video.duration ? `${video.duration} min` : "N/A"}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => router.push(`/watch/${video.url.split("/").pop()}`)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Boshlash
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Shaxsiy ma'lumotlar</CardTitle>
                <CardDescription>
                  Hisobingiz va shaxsiy ma'lumotlaringizni boshqaring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="first_name"
                        defaultValue={user?.first_name || ""}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ism</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ismingiz"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        defaultValue={user?.last_name || ""}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Familiya</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Familiyangiz"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        defaultValue={user?.email || ""}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Emailingiz"
                                {...field}
                                type="email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Telefon raqamingiz"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Yangi parol (ixtiyoriy)</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Yangi parol"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Saqlash
                    </Button>
                  </form>
                </Form>
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
