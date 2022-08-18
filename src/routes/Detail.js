import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div className={styles.movie__detail}>
            <Movie
              key={movie.id}
              coverImage={movie.medium_cover_image}
              title={movie.title}
              summary={movie.description_full}
              genres={movie.genres}
              id={movie.id}
            />
          </div>
        )}
      </div>

      {loading ? null : (
        <div className={styles.btn__div}>
          <button className={styles.btn__list}>
            <Link to="/">Back to list</Link>
          </button>
        </div>
      )}
    </>
  );
}

export default Detail;
