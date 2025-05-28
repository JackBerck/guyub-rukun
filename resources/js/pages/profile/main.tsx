"use client"

import { useState } from "react"
import { Edit, MapPin, Phone, Mail, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Head } from "@inertiajs/react"
import Layout from "@/layouts/layout"
import { ProfileLayout } from "@/layouts/profile-layout"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Ahmad Rizki",
    email: "ahmad.rizki@email.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta Selatan",
    bio: "Saya adalah seorang yang peduli dengan masalah kelaparan di Indonesia. Melalui PeduliRasa, saya berharap dapat membantu mengurangi pemborosan makanan dan membantu sesama yang membutuhkan.",
    joinDate: "Januari 2024",
  })

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false)
    alert("Profil berhasil diperbarui!")
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <Layout>
      <Head title="Profil Saya" />
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kelola Profil</h1>
              <p className="text-gray-600">Kelola informasi profil dan pengaturan akun Anda</p>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profil
              </Button>
            )}
          </div>

          <Card className="bg-light-base text-dark-base shadow-none">
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>Informasi dasar tentang akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-full bg-emerald-100">
                  <img
                    src="/img/avatars/default.jpg"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    Ganti Foto
                  </Button>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm text-gray-900">{profileData.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-900">{profileData.email}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-900">{profileData.phone}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-sm text-gray-900">{profileData.location}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-gray-900">{profileData.bio}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Bergabung Sejak</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p className="text-sm text-gray-900">{profileData.joinDate}</p>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                    Simpan Perubahan
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Batal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className="bg-light-base text-dark-base shadow-none">
            <CardHeader>
              <CardTitle>Statistik Aktivitas</CardTitle>
              <CardDescription>Ringkasan aktivitas Anda di PeduliRasa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                  <div className="text-sm text-gray-500">Donasi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <div className="text-sm text-gray-500">Forum</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">3</div>
                  <div className="text-sm text-gray-500">Acara</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">5</div>
                  <div className="text-sm text-gray-500">Bantuan</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProfileLayout>
    </Layout>
  )
}
