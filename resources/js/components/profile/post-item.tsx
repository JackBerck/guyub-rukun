"use client"

import { useState } from "react"
import { Edit, Trash2, MapPin, Clock, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PostItemProps {
  id: number
  title: string
  description: string
  image?: string
  location?: string
  category: string
  urgency?: string
  date?: string
  time?: string
  createdAt: string
  type: "donation" | "forum" | "request" | "event"
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export function PostItem({
  id,
  title,
  description,
  image,
  location,
  category,
  urgency,
  date,
  time,
  createdAt,
  type,
  onEdit,
  onDelete,
}: PostItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
      setIsDeleting(true)
      // Simulate API call
      setTimeout(() => {
        onDelete(id)
        setIsDeleting(false)
      }, 1000)
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "donation":
        return "bg-emerald-100 text-emerald-800"
      case "forum":
        return "bg-blue-100 text-blue-800"
      case "request":
        return "bg-orange-100 text-orange-800"
      case "event":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = () => {
    switch (urgency) {
      case "mendesak":
        return "bg-red-100 text-red-800"
      case "sedang":
        return "bg-yellow-100 text-yellow-800"
      case "rendah":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="transition-shadow hover:shadow-md bg-light-base text-dark-base">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor()}`}
              >
                {category}
              </span>
              {urgency && (
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getUrgencyColor()}`}
                >
                  {urgency}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{createdAt}</span>
              </div>
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-light-base text-dark-base">
              <DropdownMenuItem onClick={() => onEdit(id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? "Menghapus..." : "Hapus"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {image && (
            <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
              <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
            </div>
          )}
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
          {(date || time) && (
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {date && <span>📅 {date}</span>}
              {time && <span>🕐 {time}</span>}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
