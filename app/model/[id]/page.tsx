"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ModelViewer from "@/components/model-viewer"
import { toast } from "sonner"

export default function ModelPage() {
  const router = useRouter()
  const params = useParams()
  const [model, setModel] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const modelId = params.id
    const foundModel = models.find((m) => m.id === modelId)

    if (foundModel) {
      setModel(foundModel)
    }

    setLoading(false)
  }, [params.id])

  const handleDownload = async () => {
    if (!model) return

    try {
      // Fetch the STL file
      const response = await fetch(model.modelPath)
      const blob = await response.blob()
      
      // Create a download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${model.title.toLowerCase().replace(/\s+/g, '-')}.stl`
      document.body.appendChild(a)
      a.click()
      
      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading model:', error)
    }
  }

  const handleShare = async () => {
    try {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      toast.success('Link copied to clipboard!')
    } catch (error) {
      console.error('Error sharing:', error)
      toast.error('Failed to copy link')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Model not found</h1>
        <Button variant="outline" onClick={() => router.push("/")} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
        </Button>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-8 hover:bg-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="h-[500px] relative">
              <ModelViewer modelPath={model.modelPath} />

              <div className="absolute bottom-4 right-4 flex space-x-2">
                <Button size="sm" variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h1 className="text-3xl font-bold mb-2">{model.title}</h1>
            <div className="flex items-center mb-6">
              <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-700">
                {model.category}
              </Badge>
              <span className="text-gray-400 text-sm ml-4">Created: {model.createdAt}</span>
            </div>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Technical Details</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <p className="text-gray-300 leading-relaxed">{model.description}</p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  {model.extendedDescription ||
                    "This is an extended description of the model, including its inspiration, creation process, and notable features. In a real application, this would contain detailed information about the model's background and development."}
                </p>
              </TabsContent>
              <TabsContent value="details" className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">File Format</h3>
                    <p className="text-white">STL</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">File Size</h3>
                    <p className="text-white">~{Math.round(model.modelPath.includes('WaveSurface') ? 723 : 862) / 1024} KB</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8 flex space-x-4">
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const models = [
  {
    id: "wave-surface",
    title: "Wave Surface",
    description:
      "A sleek, aerodynamic car design inspired by cyberpunk aesthetics. Features gull-wing doors and an electric propulsion system.",
    extendedDescription:
      "This concept vehicle was designed as part of a future transportation project. The aerodynamic profile reduces drag coefficient to 0.21, while the gull-wing doors provide easy access in tight urban spaces. The electric propulsion system features four in-wheel motors providing a combined 800 horsepower with a range of 500 miles on a single charge.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/WaveSurface.stl",
    category: "Vehicles",
    createdAt: "2023-09-15",
  },
  {
    id: "gameboy-keychain",
    title: "Gameboy Keychain",
    description:
      "Military-grade helmet with integrated HUD and breathing apparatus. Designed for extreme environments and combat situations.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/gameBoyKeychain.stl",
    category: "Props",
    createdAt: "2023-10-22",
  },
  {
    id: "fantasy-castle",
    title: "Fantasy Castle",
    description:
      "Medieval castle with fantasy elements including dragon perches, magical towers, and an enchanted moat. Inspired by classic fantasy literature.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/gameBoyKeychain.stl",
    category: "Architecture",
    createdAt: "2023-11-05",
  },
  {
    id: "robot-companion",
    title: "Robot Companion",
    description:
      "Friendly household robot assistant with expressive features and modular attachments. Designed to be approachable and non-threatening.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/gameBoyKeychain.stl",
    category: "Characters",
    createdAt: "2023-12-18",
  },
  {
    id: "alien-flora",
    title: "Alien Flora",
    description:
      "Collection of extraterrestrial plant life with bioluminescent properties. Designed for a game environment set on an exoplanet.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/gameBoyKeychain.stl",
    category: "Environment",
    createdAt: "2024-01-30",
  },
  {
    id: "mech-warrior",
    title: "Mech Warrior",
    description:
      "Heavily armed bipedal combat mech with detailed cockpit interior and weathered exterior. Features articulated joints and weapons systems.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/gameBoyKeychain.stl",
    category: "Vehicles",
    createdAt: "2024-02-14",
  },
]
