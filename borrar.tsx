import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  actors: string[];
  plot: string;
  poster: string;
  trailer: string;
  runtime: number;
  awards: string;
  country: string;
  language: string;
  boxOffice: string;
  production: string;
  website: string;
}

export default function MovieDetailModal() {
  const [isOpen, setIsOpen] = useState(false)

  // Sample movie data
  const movie: Movie = {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.8,
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "/placeholder.svg?height=300&width=200",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    runtime: 148,
    awards: "Won 4 Oscars. 157 wins & 220 nominations total",
    country: "United States, United Kingdom",
    language: "English, Japanese, French",
    boxOffice: "$836,836,967",
    production: "Warner Bros. Pictures",
    website: "https://www.warnerbros.com/movies/inception"
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Movie Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{movie.title} ({movie.year})</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-1">
            <img src={movie.poster} alt={movie.title} className="w-full rounded-lg shadow-md" />
          </div>
          <div className="col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Genre</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="secondary">{g}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Rating</h3>
              <p>{movie.rating}/10</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Cast</h3>
              <p>{movie.actors.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Plot</h3>
              <p>{movie.plot}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Trailer</h3>
            <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Watch Trailer
            </a>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Runtime</h3>
            <p>{movie.runtime} minutes</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Awards</h3>
            <p>{movie.awards}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Country</h3>
            <p>{movie.country}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Language</h3>
            <p>{movie.language}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Box Office</h3>
            <p>{movie.boxOffice}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Production</h3>
            <p>{movie.production}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Website</h3>
            <a href={movie.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {movie.website}
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}