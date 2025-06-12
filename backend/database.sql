CREATE DATABASE IF NOT EXISTS informaticki_projekt;
USE informaticki_projekt;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  year INT
);

INSERT INTO books (title, author, description, year) VALUES
('1984', 'George Orwell', 'Dystopian novel', 1949),
('To Kill a Mockingbird', 'Harper Lee', 'Classic novel', 1960),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Novel set in the Jazz Age', 1925),
('Pride and Prejudice', 'Jane Austen', 'Romantic novel', 1813),
('Moby Dick', 'Herman Melville', 'Adventure novel', 1851),
('Crime and Punishment', 'Fyodor Dostoevsky', 'Psychological thriller', 1866),
('War and Peace', 'Leo Tolstoy', 'Historical novel', 1869),
('Brave New World', 'Aldous Huxley', 'Dystopian novel', 1932),
('The Catcher in the Rye', 'J.D. Salinger', 'Coming-of-age novel', 1951),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy novel', 1937),
('Lord of the Flies', 'William Golding', 'Allegorical novel', 1954),
('The Brothers Karamazov', 'Fyodor Dostoevsky', 'Philosophical novel', 1880),
('Jane Eyre', 'Charlotte Brontë', 'Gothic novel', 1847),
('Wuthering Heights', 'Emily Brontë', 'Gothic novel', 1847),
('Anna Karenina', 'Leo Tolstoy', 'Realist novel', 1877),
('Don Quixote', 'Miguel de Cervantes', 'Satirical novel', 1605),
('Fahrenheit 451', 'Ray Bradbury', 'Dystopian novel', 1953),
('The Odyssey', 'Homer', 'Epic poem', -800),
('Frankenstein', 'Mary Shelley', 'Gothic novel', 1818),
('The Picture of Dorian Gray', 'Oscar Wilde', 'Philosophical novel', 1890);
