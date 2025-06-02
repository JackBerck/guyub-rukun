"use client"

import { useState } from "react"
import { MapPin, Calendar, Share2, UserPlus, UserCheck, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserProfileHeaderProps {
  user: {
    id: number
    name: string
    email: string
    avatar?: string
    bio?: string
    location?: string
    joinDate: string
    isVerified: boolean
    stats: {
      totalPosts: number
      donations: number
      requests: number
      forums: number
      events: number
      likes: number
      comments: number
    }
  }
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isReporting, setIsReporting] = useState(false)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // Implement follow/unfollow logic
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Profil ${user.name} - PeduliRasa`,
        text: `Lihat profil dan aktivitas ${user.name} di PeduliRasa`,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link profil telah disalin!")
    }
  }

  const handleReport = () => {
    if (confirm("Apakah Anda yakin ingin melaporkan pengguna ini?")) {
      setIsReporting(true)
      // Implement report logic
      setTimeout(() => {
        setIsReporting(false)
        alert("Laporan telah dikirim. Terima kasih atas laporan Anda.")
      }, 1000)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full bg-emerald-100">
                <img
                  src={user.avatar || "/placeholder.svg?height=200&width=200&text=User"}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <UserCheck className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                {user.isVerified && (
                  <Badge variant="secondary" className="w-fit">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Terverifikasi
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{user.joinDate}</span>
                </div>
              </div>
            </div>

            {user.bio && <p className="text-gray-700 leading-relaxed">{user.bio}</p>}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{user.stats.totalPosts}</div>
                <div className="text-sm text-gray-500">Postingan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user.stats.donations}</div>
                <div className="text-sm text-gray-500">Donasi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{user.stats.likes}</div>
                <div className="text-sm text-gray-500">Disukai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{user.stats.comments}</div>
                <div className="text-sm text-gray-500">Komentar</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"} className="gap-2">
                {isFollowing ? (
                  <>
                    <UserCheck className="h-4 w-4" />
                    Mengikuti
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Ikuti
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="h-4 w-4" />
                Bagikan
              </Button>

              <Button
                variant="outline"
                onClick={handleReport}
                className="gap-2 text-red-600 hover:text-red-700"
                disabled={isReporting}
              >
                <Flag className="h-4 w-4" />
                {isReporting ? "Melaporkan..." : "Laporkan"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
