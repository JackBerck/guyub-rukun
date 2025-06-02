"use client"

import { useState } from "react"
import { Link, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PostItem } from "@/components/profile/post-item"
import Layout from "@/layouts/layout"
import { Head } from "@inertiajs/react"
import { ProfileLayout } from "@/layouts/profile-layout"

export default function ProfileEventsPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Jumat Berkah: Berbagi Makanan di Pasar Minggu",
      description:
        "Acara berbagi makanan gratis untuk masyarakat kurang mampu di sekitar Pasar Minggu. Mari bergabung untuk berbagi kebahagiaan.",
        image: "/img/posts/rumah-makan.jpg",
      location: "Pasar Minggu, Jakarta Selatan",
      category: "Berbagi Makanan",
      date: "2024-02-15",
      time: "08:00",
      createdAt: "2 hari yang lalu",
    },
    {
      id: 2,
      title: "Workshop Pengolahan Makanan Bergizi",
      description:
        "Workshop tentang cara mengolah makanan bergizi dengan bahan-bahan sederhana dan terjangkau. Cocok untuk ibu-ibu rumah tangga.",
      image: "/img/posts/komunitas.jpeg",
      location: "Community Center Bandung",
      category: "Workshop",
      date: "2024-02-20",
      time: "14:00",
      createdAt: "1 minggu yang lalu",
    },
    {
      id: 3,
      title: "Bakti Sosial Ramadan: Buka Puasa Bersama",
      description:
        "Acara buka puasa bersama untuk anak yatim dan masyarakat kurang mampu. Mari berbagi kebahagiaan di bulan suci Ramadan.",
      image: "/img/posts/restoran.jpg",
      location: "Masjid Al-Ikhlas, Surabaya",
      category: "Bakti Sosial",
      date: "2024-03-15",
      time: "17:30",
      createdAt: "2 minggu yang lalu",
    },
  ])

  const handleEdit = (id: number) => {
    // Navigate to edit page
    window.location.href = `/events/${id}/edit`
  }

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <Layout>
      <Head title="Kelola Acara" />
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kelola Acara</h1>
              <p className="text-gray-600">Kelola semua acara yang telah Anda buat</p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/events/create">
                <Plus className="h-4 w-4" />
                Buat Acara
              </Link>
            </Button>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Anda belum membuat acara apapun</p>
              <Button asChild>
                <Link href="/events/create">Buat Acara Pertama</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {events.map((event) => (
                <PostItem key={event.id} {...event} type="event" onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </ProfileLayout>
    </Layout>
  )
}
