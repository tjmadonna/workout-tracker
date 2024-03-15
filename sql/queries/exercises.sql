-- name: GetAllExercises :many
SELECT * FROM exercises;

-- name: GetExerciseById :one
SELECT * FROM exercises WHERE id = $1;

-- name: CreateExercise :one
INSERT INTO exercises (name, muscle_group) VALUES ($1, $2) RETURNING *;

-- name: UpdateExercise :one
UPDATE exercises SET name = $1, muscle_group = $2 WHERE id = $3 RETURNING *;

-- name: DeleteExercise :one
DELETE FROM exercises WHERE id = $1 RETURNING *;