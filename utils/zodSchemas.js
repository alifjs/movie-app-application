import { z } from 'zod';

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  poster_path: z.string().nullable(),
});

export const recommendationsSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      poster_path: z.string().nullable(),
      overview: z.string(),
    })
  ),
});
