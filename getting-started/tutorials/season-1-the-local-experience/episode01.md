# Episode 1: Playlist

**This flow loads a movie metadata CSV file and builds a playlist for your favorite movie genre. Everything in Metaflow is versioned, so you can run it multiple times and view all the historical playlists with the Metaflow client in an R Markdown Notebook.**

## Showcasing:

* Basic Metaflow Parameters.
* Running workflow branches in parallel and joining results.
* Using the Metaflow client in an R Markdown Notebook.

## To play this episode:

1. `cd metaflow-tutorials/R`
2. `Rscript 01-playlist/playlist.R show`
3. `Rscript 01-playlist/playlist.R run`
4. `Rscript 01-playlist/playlist.R run --genre comedy`
5. Open `01-playlist/playlist.Rmd` in RStudio.

## Dataset and flow script

The dataset `movies.csv` looks like this

| movie\_title | title\_year | genre | gross |
| :--- | :--- | :--- | :--- |
| Avatar | 2009 | Sci-Fi | 760505847 |
| Pirates of the Caribbean: At World's End | 2007 | Fantasy | 309404152 |
| Spectre | 2015 | Thriller | 200074175 |
| ... | ... | ... | ... |

The flow script below performs the following steps: 1. Ingests a CSV file containing metadata about movies. 2. Loads two of the columns from the CSV into python lists. 3. In parallel branches:

* Filters movies by the genre parameter.
* Choose a random movie from a different genre.
  1. Displays the top entries from the playlist.

```r
library(metaflow)

# Parse the CSV file 
start <- function(self){
    self$df <- read.csv("./movies.csv", stringsAsFactors=FALSE)
}

# Filter the movies by genre.
pick_movie <- function(self){
    # select rows which has the specified genre
    movie_by_genre <- self$df[self$df$genre == self$genre, ]

    # randomize the title names
    shuffled_rows <- sample(nrow(movie_by_genre))
    self$movies <- movie_by_genre[shuffled_rows, ]
}

# This step chooses a random movie from a different genre.
bonus_movie <- function(self){
    # select all movies not matching the specified genre
    bonus_movies <- self$df[self$df$genre != self$genre, ]

    idx <- sample(nrow(bonus_movies), size=1)
    self$bonus <- bonus_movies$movie_title[idx]
}

#  Join our parallel branches and merge results.
join <- function(self, inputs){
    # Reassign relevant variables from our branches.
    self$bonus <- inputs$bonus_movie$bonus
    self$playlist <- inputs$pick_movie$movies
}

# Print out the playlist and bonus movie.
end <- function(self){
    message("Playlist for movies in genre: ", self$genre)
    for (i in 1:nrow(self$playlist)){
        message(sprintf("Pick %d: %s", i, self$playlist$title[i]))

        if (i > self$top_k) break; 
    }
}

metaflow("PlayListFlow") %>% 
    parameter("genre", 
              help = "Filter movies for a particular genre.", 
              default = "Sci-Fi") %>%    
    parameter("top_k",
              help = "The number of movies to recommend in the playlist.",
              default = 5,
              type = "int") %>%
    step(step = "start", 
         r_function = start, 
         next_step = c("pick_movie", "bonus_movie")) %>%
    step(step = "pick_movie",
         r_function = pick_movie,
         next_step = "join") %>%
    step(step = "bonus_movie",
         r_function = bonus_movie,
         next_step = "join") %>%
    step(step = "join",
         r_function = join,
         join = TRUE,
         next_step = "end") %>%
    step(step = "end", 
         r_function = end) %>%
    run()
```

