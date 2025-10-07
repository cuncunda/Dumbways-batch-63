-- buat databse
CREATE DATABASE "dumbways2-db";

-- buat tabel
CREATE TABLE myproject (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  technologies TEXT[],
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- cnth data
INSERT INTO myproject 
(name, description, technologies, start_date, end_date, image_url) 
VALUES 
(
  'Personal Website',
  'My Projects',
  ARRAY['react Js', 'Next Js', 'JavaScript', 'TypeScript'],
  '2025-09-01',
  '2025-09-30',
  'https://via.placeholder.com/300x200'
);

SELECT * FROM myproject;