import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // 1. Create book genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });

  const science = await prisma.genre.upsert({
    where: { name: 'Science' },
    update: {},
    create: { name: 'Science' },
  });

  const history = await prisma.genre.upsert({
    where: { name: 'History' },
    update: {},
    create: { name: 'History' },
  });

  const technology = await prisma.genre.upsert({
    where: { name: 'Technology' },
    update: {},
    create: { name: 'Technology' },
  });

  // 2. Create sample books
  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', description: 'A novel exploring Igbo culture and colonialism.', genreId: fiction.id },
    { title: 'The River Between', author: 'Ngugi wa Thiong’o', description: 'A novel about tradition, culture, and change.', genreId: fiction.id },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'A story exploring wealth, love, and the American Dream.', genreId: fiction.id },
    { title: 'Animal Farm', author: 'George Orwell', description: 'A political allegory about power and corruption.', genreId: fiction.id },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', description: 'An introduction to cosmology and the universe.', genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', description: 'An exploration of evolution and genetics.', genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', description: 'A journey through space, science, and discovery.', genreId: science.id },
    { title: 'The Origin of Species', author: 'Charles Darwin', description: 'A foundational work on biological evolution.', genreId: science.id },
    { title: 'The Art of War', author: 'Sun Tzu', description: 'An ancient text on strategy and military thinking.', genreId: history.id },
    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', description: 'An autobiography of Nelson Mandela.', genreId: history.id },
    { title: 'The Wretched of the Earth', author: 'Frantz Fanon', description: 'A study of colonialism and decolonization.', genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', description: 'An exploration of the development of human societies.', genreId: history.id },
    { title: 'Clean Code', author: 'Robert C. Martin', description: 'Principles and practices for writing maintainable code.', genreId: technology.id },
    { title: 'The Pragmatic Programmer', author: 'David Thomas and Andrew Hunt', description: 'Practical advice for software development.', genreId: technology.id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen et al.', description: 'A comprehensive introduction to computer algorithms.', genreId: technology.id },
  ];

  // 3. Insert books into the database
  await prisma.book.createMany({
    data: books,
    skipDuplicates: true,
  });

  console.log(`Successfully seeded ${books.length} books.`);
}
main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });