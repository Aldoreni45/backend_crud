import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Seeding database...");
  
  // Create a user first
  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: "Demo User",
      email: "demo@example.com",
      password: "hashedpassword123", // In real app, this would be hashed
    },
  });
  
  console.log(`Created user: ${user.name}`);

  const movies = [
    {
      title: "The Matrix",
      overview: "A computer hacker learns about the true nature of reality.",
      releaseYear: 1999,
      genres: ["Action", "Sci-Fi"],
      runtime: 136,
      posterUrl: "https://example.com/matrix.jpg",
      createdBy: user.id,
    },
    {
      title: "Inception",
      overview: "A thief who steals corporate secrets through dream-sharing technology.",
      releaseYear: 2010,
      genres: ["Action", "Sci-Fi", "Thriller"],
      runtime: 148,
      posterUrl: "https://example.com/inception.jpg",
      createdBy: user.id,
    },
    {
      title: "The Dark Knight",
      overview: "Batman faces the Joker in a battle for Gotham's soul.",
      releaseYear: 2008,
      genres: ["Action", "Crime", "Drama"],
      runtime: 152,
      posterUrl: "https://example.com/darkknight.jpg",
      createdBy: user.id,
    },
    {
      title: "Pulp Fiction",
      overview: "The lives of two mob hitmen, a boxer, and others intertwine.",
      releaseYear: 1994,
      genres: ["Crime", "Drama"],
      runtime: 154,
      posterUrl: "https://example.com/pulpfiction.jpg",
      createdBy: user.id,
    },
    {
      title: "Interstellar",
      overview: "A team of explorers travel through a wormhole in space.",
      releaseYear: 2014,
      genres: ["Adventure", "Drama", "Sci-Fi"],
      runtime: 169,
      posterUrl: "https://example.com/interstellar.jpg",
      createdBy: user.id,
    },
    {
      title: "The Shawshank Redemption",
      overview: "Two imprisoned men bond over a number of years.",
      releaseYear: 1994,
      genres: ["Drama"],
      runtime: 142,
      posterUrl: "https://example.com/shawshank.jpg",
      createdBy: user.id,
    },
    {
      title: "Fight Club",
      overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club.",
      releaseYear: 1999,
      genres: ["Drama"],
      runtime: 139,
      posterUrl: "https://example.com/fightclub.jpg",
      createdBy: user.id,
    },
    {
      title: "Forrest Gump",
      overview: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
      releaseYear: 1994,
      genres: ["Drama", "Romance"],
      runtime: 142,
      posterUrl: "https://example.com/forrestgump.jpg",
      createdBy: user.id,
    },
    {
      title: "The Godfather",
      overview: "The aging patriarch of an organized crime dynasty transfers control to his son.",
      releaseYear: 1972,
      genres: ["Crime", "Drama"],
      runtime: 175,
      posterUrl: "https://example.com/godfather.jpg",
      createdBy: user.id,
    },
    {
      title: "Goodfellas",
      overview: "The story of Henry Hill and his life in the mob.",
      releaseYear: 1990,
      genres: ["Biography", "Crime", "Drama"],
      runtime: 146,
      posterUrl: "https://example.com/goodfellas.jpg",
      createdBy: user.id,
    },
  ];

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });
    console.log(`Created movie: ${movie.title}`);
  }

  console.log("Seeding completed!");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });