-- +goose Up

CREATE TYPE muscle_group AS ENUM (
    'abs',
    'back',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'quadriceps',
    'shoulders',
    'triceps'
);

CREATE TABLE exercises (
    id INT GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    muscle_group muscle_group NOT NULL,
    PRIMARY KEY (id)
);
CREATE UNIQUE INDEX exercises_name_key ON exercises (LOWER(name));

-- +goose Down
DROP INDEX exercises_name_key;
DROP TABLE exercises;
DROP TYPE muscle_group;
