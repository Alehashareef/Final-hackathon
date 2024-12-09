"use client"

import * as React from "react"
import { Heart, ShoppingCart, Star, Search , Grid, List } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {  Select , SelectContent , SelectItem , SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  rating: number
  image: string
  colors: string[]
}

const products: Product[] = [
  {
    id: "1",
    name: "Dictum morbi",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    price: 26.00,
    originalPrice: 32.00,
    rating: 5,
    image: "/images/chair-3.png",
    colors: ["#FF8CB8", "#FFC93E", "#48C1C9"]
  },
  {
    id: "2",
    name: "Sodales sit",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    price: 26.00,
    originalPrice: 32.00,
    rating: 4,
    image: "/images/chair-4.png",
    colors: ["#FF8CB8", "#FFC93E", "#48C1C9"]
  },
  {
    id: "3",
    name: "Nibh varius",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    price: 26.00,
    originalPrice: 32.00,
    rating: 5,
    image: "/images/chair1.png",
    colors: ["#FF8CB8", "#FFC93E", "#48C1C9"]
  },
  {
    id: "4",
    name: "Mauris quis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    price: 26.00,
    originalPrice: 32.00,
    rating: 5,
    image: "/images/black-h-p.png",
    colors: ["#FF8CB8", "#FFC93E", "#48C1C9"]
  },
  {
    id: "5",
    name: "Morbi sagittis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    price: 26.00,
    originalPrice: 32.00,
    rating: 4,
    image: "/images/cam.png",
    colors: ["#FF8CB8", "#FFC93E", "#48C1C9"]
  },
  {
    id: "6",
    name: "Ultrices venenatis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    price: 26.00,
    originalPrice: 32.00,
    rating: 3,
    image: "/images/gray.png",
    colors: ["#FF8CB8", "#FFC93E", "#48C1C9"]
  },
  {
    id: "7",
    name: "Scelerisque dignissim",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    price: 26.00,
    originalPrice: 32.00,
    rating: 5,
    image: "/images/chair4.png",
    colors: ["#FF8CB8", "#FFC93E", "#48C1C9"]
  }
]

export default function ShopPage() {
  const [view, setView] = React.useState<"grid" | "list">("list")
  const [priceRange, setPriceRange] = React.useState([0, 500])
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([])
  const [selectedDiscounts, setSelectedDiscounts] = React.useState<string[]>([])
  const [selectedRating, setSelectedRating] = React.useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [sortBy, setSortBy] = React.useState("best-match")
  const [perPage, setPerPage] = React.useState("15")
  
  const filteredProducts = products.filter(product => 
    (selectedRating ? product.rating >= parseInt(selectedRating) : true) &&
    (product.price >= priceRange[0] && product.price <= priceRange[1])
  )

  const sortedProducts = React.useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-low-high") return a.price - b.price
      if (sortBy === "price-high-low") return b.price - a.price
      return 0
    })
  }, [filteredProducts, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop Left Sidebar</h1>
      <div className="flex flex-col md:flex-row gap-8">
       
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Per Page:</span>
              <Select value={perPage} onValueChange={setPerPage}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="15" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="45">45</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Sort By:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Best Match" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="best-match">Best Match</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("grid")}
                className={view === "grid" ? "text-primary" : "text-muted-foreground"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setView("list")}
                className={view === "list" ? "text-primary" : "text-muted-foreground"}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className={`grid gap-6 ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {sortedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden md:h-[230px]">
                <CardContent className={`p-0 ${view === "list" ? "flex" : ""}`}>
                  <div className={`${view === "list" ? "w-1/3" : "w-full"} bg-muted aspect-square overflow-hidden`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`${view === "list" ? "w-2/3" : "w-full"} p-4 space-y-4`}>
                    <div>
                        <div className="md:flex justify-between items-center md:w-[340px]">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    </div>
                      <div className="flex items-center gap-2 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < product.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-muted-foreground lg:mr-36">{product.description}</p>
                    <div className="flex gap-3 transition-all duration-300 ">
          <Button
           
            className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-[#FB2E86] hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
          <Button
           
            className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-[#FB2E86] hover:text-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
           
            className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-[#FB2E86] hover:text-white"
            
          >
            
              <Search className="h-4 w-4" />
            
          </Button>
        </div>
                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

