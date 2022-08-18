import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      {loading ? null : (
        <h1
          style={{
            textAlign: "center",
          }}
        >
          Movie List w/ Minimum Rating of 8.8
        </h1>
      )}
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.movies}>
            {movies.map((item) => (
              <Movie
                key={item.id}
                coverImage={item.medium_cover_image}
                title={item.title}
                summary={item.summary}
                genres={item.genres}
                id={item.id}
                year={item.year}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
