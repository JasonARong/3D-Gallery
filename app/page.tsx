import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
          3D Model Gallery
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl">
          Explore my collection of 3D models. Each piece is crafted with attention to detail and available for viewing
          in an interactive 3D environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <Link
              key={model.id}
              href={`/model/${model.id}`}
              className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300"
            >
              <div className="h-64 bg-gray-800 relative">
                <img
                  src={model.thumbnail || "/placeholder.svg"}
                  alt={model.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{model.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{model.description}</p>
                <div className="flex items-center text-purple-500 font-medium">
                  View Model <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

const models = [
  {
    id: "futuristic-car",
    title: "Futuristic Car Concept",
    description:
      "A sleek, aerodynamic car design inspired by cyberpunk aesthetics. Features gull-wing doors and an electric propulsion system.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/duck.glb", // Using duck as placeholder
    category: "Vehicles",
    createdAt: "2023-09-15",
  },
  {
    id: "sci-fi-helmet",
    title: "Sci-Fi Combat Helmet",
    description:
      "Military-grade helmet with integrated HUD and breathing apparatus. Designed for extreme environments and combat situations.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/duck.glb", // Using duck as placeholder
    category: "Props",
    createdAt: "2023-10-22",
  },
  {
    id: "fantasy-castle",
    title: "Fantasy Castle",
    description:
      "Medieval castle with fantasy elements including dragon perches, magical towers, and an enchanted moat. Inspired by classic fantasy literature.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/duck.glb", // Using duck as placeholder
    category: "Architecture",
    createdAt: "2023-11-05",
  },
  {
    id: "robot-companion",
    title: "Robot Companion",
    description:
      "Friendly household robot assistant with expressive features and modular attachments. Designed to be approachable and non-threatening.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/duck.glb", // Using duck as placeholder
    category: "Characters",
    createdAt: "2023-12-18",
  },
  {
    id: "alien-flora",
    title: "Alien Flora",
    description:
      "Collection of extraterrestrial plant life with bioluminescent properties. Designed for a game environment set on an exoplanet.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/duck.glb", // Using duck as placeholder
    category: "Environment",
    createdAt: "2024-01-30",
  },
  {
    id: "mech-warrior",
    title: "Mech Warrior",
    description:
      "Heavily armed bipedal combat mech with detailed cockpit interior and weathered exterior. Features articulated joints and weapons systems.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    modelPath: "/assets/3d/duck.glb", // Using duck as placeholder
    category: "Vehicles",
    createdAt: "2024-02-14",
  },
]
