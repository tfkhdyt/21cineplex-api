export default interface Movie {
  id: string
  title: string
  type: string
  rating: string
  bannerUrl: string
  trailerUrl?: string
  genre?: string[]
  duration?: string
  description?: string
  producer?: string[]
  director?: string[]
  writer?: string[]
  cast?: string[]
  distributor?: string[]
  website?: string
}
