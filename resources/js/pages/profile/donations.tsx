"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Layout from "@/layouts/layout"
import { Head, Link } from "@inertiajs/react"
import { ProfileLayout } from "@/layouts/profile-layout"
import { PostItem } from "@/components/profile/post-item"

export default function ProfileDonationsPage() {
  const [donations, setDonations] = useState([
    {
      id: 1,
      title: "Makanan Siap Saji untuk 10 Orang",
      description:
        "Kami memiliki makanan catering yang tersisa dari acara kantor. Masih layak konsumsi dan bisa diambil hari ini sebelum jam 8 malam.",
      image: "/img/posts/restoran.jpg",
      location: "Jakarta Selatan",
      category: "Makanan",
      createdAt: "2 hari yang lalu",
    },
    {
      id: 2,
      title: "Sembako untuk Keluarga Terdampak",
      description:
        "Kami menyediakan paket sembako berisi beras 5kg, minyak goreng 2L, gula 1kg, dan kebutuhan pokok lainnya.",
      image: "/img/posts/komunitas.jpeg",
      location: "Bandung",
      category: "Sembako",
      createdAt: "1 minggu yang lalu",
    },
    {
      id: 3,
      title: "Roti dan Kue dari Bakery",
      description: "Kami memiliki roti dan kue yang tidak terjual hari ini. Masih segar dan bisa diambil malam ini.",
      image: "/img/posts/rumah-makan.jpg",
      location: "Surabaya",
      category: "Makanan",
      createdAt: "3 hari yang lalu",
    },
  ])

  const handleEdit = (id: number) => {
    // Navigate to edit page
    window.location.href = `/donations/${id}/edit`
  }

  const handleDelete = (id: number) => {
    setDonations(donations.filter((donation) => donation.id !== id))
  }

  return (
    <Layout>
      <Head title="Kelola Donasi" />
      <ProfileLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kelola Donasi</h1>
              <p className="text-gray-600">Kelola semua donasi yang telah Anda buat</p>
            </div>
            <Button asChild className="gap-2">
              <Link href="/donations/create">
                <Plus className="h-4 w-4" />
                Tambah Donasi
              </Link>
            </Button>
          </div>

          {donations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Anda belum membuat donasi apapun</p>
              <Button asChild>
                <Link href="/donations/create">Buat Donasi Pertama</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {donations.map((donation) => (
                <PostItem key={donation.id} {...donation} type="donation" onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </ProfileLayout>
    </Layout>
  )
}
