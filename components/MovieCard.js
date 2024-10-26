import Image from 'next/image';
import Link from 'next/link'; 
import styles from './MovieCard.module.css'; 

export default function MovieCard({ movie }) {
  const { id, title, poster_path } = movie;
  const imageUrl = poster_path 
    ? `https://image.tmdb.org/t/p/w500${poster_path}` 
    : '/images/fallback-poster.png';

  return (
    <div className={styles.card}>
      <Link href={`/movies/${id}`}> 
        <Image 
          src={imageUrl} 
          alt={title} 
          width={200} 
          height={300} 
          loading="lazy" 
        />
        <h3>{title}</h3>
      </Link>
    </div>
  );
}

