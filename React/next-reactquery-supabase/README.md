CREATE TABLE users (
  id uuid references auth.users PRIMARY KEY,
  name text,
  username text unique
);

CREATE TABLE movies (
  movie_id integer PRIMARY KEY,
  title text,
  poster_path text,
  overview text,
  release_date date
);

CREATE TABLE recommendations (
   id uuid NOT NULL DEFAULT extensions.uuid_generate_v4(),
   primary key(id),
   user_id uuid,
   constraint user_id foreign key(user_id) references users(id),
   movie_id integer,
   constraint movie_id foreign key(movie_id) references movies(movie_id)
);

CREATE UNIQUE INDEX "user_id_movie_id" on recommendations using BTREE ("movie_id", "user_id");