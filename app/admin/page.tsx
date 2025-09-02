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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Users,
  CreditCard,
  BookOpen,
  Settings,
  Search,
  CheckCircle,
  X,
  Eye,
  Edit,
  Trash2,
  PlusCircle,
  Upload,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CourseService from "@/services/course.service";
import VideoService from "@/services/video.service";
import { Course } from "@/types/course"
import { CreateCourseDto, UpdateCourseDto } from "@/services/course.service";

export default function AdminPage() {
  const { user } = useUserStore();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
  const [isVideoUploadFormOpen, setIsVideoUploadFormOpen] = useState(false);
  const [currentVideoFile, setCurrentVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  // Form states for Course
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState<number>(0);
  const [courseCategory, setCourseCategory] = useState<string[]>([]);

  useEffect(() => {
    if (user === undefined) {
      setLoading(true);
      return;
    }

    if (user === null) {
      router.push("/login");
      return;
    }

    if (user.role !== Role.ADMIN) {
      router.push("/dashboard");
      return;
    }

    fetchCourses();
  }, [user, router]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const fetchedCourses = await CourseService.findAll();
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Kurslarni yuklashda xato:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const newCourse: CreateCourseDto = {
        title: courseTitle,
        description: courseDescription,
        price: coursePrice,
        category: courseCategory,
      };
      await CourseService.create(newCourse);
      fetchCourses();
      setIsCourseFormOpen(false);
      resetCourseForm();
    } catch (error) {
      console.error("Kurs yaratishda xato:", error);
    }
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse) return;
    try {
      const updatedCourse: UpdateCourseDto = {
        title: courseTitle,
        description: courseDescription,
        price: coursePrice,
        category: courseCategory,
      };
      await CourseService.update(selectedCourse._id, updatedCourse);
      fetchCourses();
      setIsCourseFormOpen(false);
      resetCourseForm();
    } catch (error) {
      console.error("Kursni yangilashda xato:", error);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm("Haqiqatan ham bu kursni o'chirmoqchimisiz?")) {
      try {
        await CourseService.remove(id);
        fetchCourses();
      } catch (error) {
        console.error("Kursni o'chirishda xato:", error);
      }
    }
  };

  const handleEditCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setCourseTitle(course.title);
    setCourseDescription(course.description || "");
    setCoursePrice(course.price);
    setCourseCategory(course.category || []);
    setIsCourseFormOpen(true);
  };

  const resetCourseForm = () => {
    setSelectedCourse(null);
    setCourseTitle("");
    setCourseDescription("");
    setCoursePrice(0);
    setCourseCategory([]);
  };

  const handleVideoUpload = async () => {
    if (!currentVideoFile || !videoTitle) {
      alert("Iltimos, video fayli va sarlavhasini kiriting.");
      return;
    }
    try {
      const createVideoDto = {
        title: videoTitle,
        description: videoDescription,
      };
      await VideoService.create(currentVideoFile, createVideoDto);
      alert("Video muvaffaqiyatli yuklandi!");
      setIsVideoUploadFormOpen(false);
      setCurrentVideoFile(null);
      setVideoTitle("");
      setVideoDescription("");
    } catch (error) {
      console.error("Videoni yuklashda xato:", error);
      alert("Videoni yuklashda xato yuz berdi.");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Mock data (keep for other tabs for now)
  const pendingPayments = [
    {
      id: 1,
      user: "Malika Karimova",
      email: "malika@example.com",
      plan: "Optimal",
      amount: "499,000 so'm",
      date: "2024-01-20",
      status: "pending",
    },
    {
      id: 2,
      user: "Nodira Tosheva",
      email: "nodira@example.com",
      plan: "VIP",
      amount: "799,000 so'm",
      date: "2024-01-19",
      status: "pending",
    },
  ];

  const users = [
    {
      id: 1,
      name: "Malika Karimova",
      email: "malika@example.com",
      phone: "+998 90 123 45 67",
      plan: "Optimal",
      status: "active",
      joinDate: "2024-01-15",
      progress: 65,
    },
    {
      id: 2,
      name: "Nodira Tosheva",
      email: "nodira@example.com",
      phone: "+998 91 234 56 78",
      plan: "VIP",
      status: "active",
      joinDate: "2024-01-10",
      progress: 80,
    },
    {
      id: 3,
      name: "Sevara Alimova",
      email: "sevara@example.com",
      phone: "+998 93 345 67 89",
      plan: "Standart",
      status: "inactive",
      joinDate: "2024-01-05",
      progress: 25,
    },
  ];

  const stats = {
    totalUsers: 156,
    activeUsers: 134,
    pendingPayments: 8,
    totalRevenue: "45,600,000 so'm",
  };

  const handleApprovePayment = (id: number) => {
    console.log("Approved payment:", id);
  };

  const handleRejectPayment = (id: number) => {
    console.log("Rejected payment:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Uyg'unlik Admin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Administrator
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">
            Foydalanuvchilar, to'lovlar va kurslarni boshqaring
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Jami foydalanuvchilar</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalUsers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Faol foydalanuvchilar</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.activeUsers}
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
                  <p className="text-sm text-gray-600">
                    Kutilayotgan to'lovlar
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.pendingPayments}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Jami daromad</p>
                  <p className="text-lg font-bold text-gray-900">
                    {stats.totalRevenue}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="payments">
          <TabsList className="mb-6">
            <TabsTrigger value="payments">To'lovlar</TabsTrigger>
            <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
            <TabsTrigger value="courses">Kurslar</TabsTrigger>
            <TabsTrigger value="settings">Sozlamalar</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Kutilayotgan to'lovlar</CardTitle>
                <CardDescription>
                  Tasdiqlash kutayotgan to'lovlarni ko'ring va boshqaring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {payment.user}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {payment.email}
                            </p>
                          </div>
                          <Badge variant="outline">{payment.plan}</Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {payment.amount} • {payment.date}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprovePayment(payment.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Tasdiqlash
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          onClick={() => handleRejectPayment(payment.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Rad etish
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Foydalanuvchilar</CardTitle>
                <CardDescription>
                  Barcha foydalanuvchilarni ko'ring va boshqaring
                </CardDescription>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Foydalanuvchi qidirish..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {user.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {user.email}
                            </p>
                            <p className="text-sm text-gray-600">
                              {user.phone}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{user.plan}</Badge>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {user.status === "active" ? "Faol" : "Nofaol"}
                            </Badge>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Ro'yxatdan o'tgan: {user.joinDate} • Progress:{" "}
                          {user.progress}%
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Ko'rish
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Tahrirlash
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          O'chirish
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Kurslar boshqaruvi</CardTitle>
                  <div className="flex space-x-2">
                    <Dialog
                      open={isCourseFormOpen}
                      onOpenChange={setIsCourseFormOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          onClick={resetCourseForm}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Yangi kurs
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            {selectedCourse
                              ? "Kursni tahrirlash"
                              : "Yangi kurs yaratish"}
                          </DialogTitle>
                          <DialogDescription>
                            {selectedCourse
                              ? "Kurs ma'lumotlarini tahrirlang."
                              : "Yangi kurs yaratish uchun ma'lumotlarni kiriting."}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                              Sarlavha
                            </Label>
                            <Input
                              id="title"
                              value={courseTitle}
                              onChange={(e) => setCourseTitle(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Tavsif
                            </Label>
                            <Textarea
                              id="description"
                              value={courseDescription}
                              onChange={(e) =>
                                setCourseDescription(e.target.value)
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                              Narxi
                            </Label>
                            <Input
                              id="price"
                              type="number"
                              value={coursePrice}
                              onChange={(e) =>
                                setCoursePrice(parseFloat(e.target.value))
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Kategoriya
                            </Label>
                            <Input
                              id="category"
                              value={courseCategory.join(", ")}
                              onChange={(e) =>
                                setCourseCategory(
                                  e.target.value.split(",").map((s) => s.trim())
                                )
                              }
                              className="col-span-3"
                              placeholder="Masalan: Ayollar salomatligi, Gormonlar"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={
                              selectedCourse
                                ? handleUpdateCourse
                                : handleCreateCourse
                            }
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {selectedCourse ? "Yangilash" : "Yaratish"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={isVideoUploadFormOpen}
                      onOpenChange={setIsVideoUploadFormOpen}
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Upload className="h-4 w-4 mr-2" />
                          Video yuklash
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Video yuklash</DialogTitle>
                          <DialogDescription>
                            Yangi videoni yuklash uchun ma'lumotlarni kiriting.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="videoTitle" className="text-right">
                              Sarlavha
                            </Label>
                            <Input
                              id="videoTitle"
                              value={videoTitle}
                              onChange={(e) => setVideoTitle(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                              htmlFor="videoDescription"
                              className="text-right"
                            >
                              Tavsif
                            </Label>
                            <Textarea
                              id="videoDescription"
                              value={videoDescription}
                              onChange={(e) =>
                                setVideoDescription(e.target.value)
                              }
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="videoFile" className="text-right">
                              Video fayl
                            </Label>
                            <Input
                              id="videoFile"
                              type="file"
                              onChange={(e) =>
                                setCurrentVideoFile(
                                  e.target.files ? e.target.files[0] : null
                                )
                              }
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            onClick={handleVideoUpload}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Yuklash
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardDescription>
                  Kurs materiallarini va darslarni boshqaring
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p>Kurslar yuklanmoqda...</p>
                ) : courses.length === 0 ? (
                  <p>Hozircha kurslar mavjud emas.</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sarlavha</TableHead>
                        <TableHead>Narxi</TableHead>
                        <TableHead>Kategoriya</TableHead>
                        <TableHead>Darslar soni</TableHead>
                        <TableHead className="text-right">Harakatlar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course._id}>
                          <TableCell className="font-medium">
                            {course.title}
                          </TableCell>
                          <TableCell>
                            {course.price.toLocaleString()} so'm
                          </TableCell>
                          <TableCell>{course.category.join(", ")}</TableCell>
                          <TableCell>{course.videos.length}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() => handleEditCourseClick(course)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                              onClick={() => handleDeleteCourse(course._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Tizim sozlamalari</CardTitle>
                <CardDescription>
                  Umumiy tizim sozlamalarini boshqaring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    To'lov sozlamalari
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Payme integratsiyasi</h5>
                        <p className="text-sm text-gray-600">
                          Payme orqali to'lovlarni qabul qilish
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Faol
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Click integratsiyasi</h5>
                        <p className="text-sm text-gray-600">
                          Click orqali to'lovlarni qabul qilish
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Faol
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">
                    Xabarnoma sozlamalari
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h5 className="font-medium">SMS xabarnomalar</h5>
                        <p className="text-sm text-gray-600">
                          Foydalanuvchilarga SMS yuborish
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Faol
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Email xabarnomalar</h5>
                        <p className="text-sm text-gray-600">
                          Foydalanuvchilarga email yuborish
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Faol
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
