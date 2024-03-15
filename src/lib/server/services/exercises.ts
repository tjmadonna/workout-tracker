import type { QueryArrayConfig, QueryArrayResult } from 'pg';

interface Client {
	query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getAllExercisesQuery = `-- name: GetAllExercises :many
SELECT id, name, muscle_group FROM exercises`;

export interface GetAllExercisesRow {
	id: number;
	name: string;
	muscleGroup: string;
}

export async function getAllExercises(client: Client): Promise<GetAllExercisesRow[]> {
	try {
		const result = await client.query({
			text: getAllExercisesQuery,
			values: [],
			rowMode: 'array'
		});
		return result.rows.map((row) => {
			return {
				id: row[0],
				name: row[1],
				muscleGroup: row[2]
			};
		});
	} catch (e) {
		console.error(e);
		return [];
	}
}

export const getExerciseByIdQuery = `-- name: GetExerciseById :one
SELECT id, name, muscle_group FROM exercises WHERE id = $1`;

export interface GetExerciseByIdArgs {
	id: number;
}

export interface GetExerciseByIdRow {
	id: number;
	name: string;
	muscleGroup: string;
}

export async function getExerciseById(
	client: Client,
	args: GetExerciseByIdArgs
): Promise<GetExerciseByIdRow | null> {
	try {
		const result = await client.query({
			text: getExerciseByIdQuery,
			values: [args.id],
			rowMode: 'array'
		});
		if (result.rows.length !== 1) {
			return null;
		}
		const row = result.rows[0];
		return {
			id: row[0],
			name: row[1],
			muscleGroup: row[2]
		};
	} catch (e) {
		console.error(e);
		return null;
	}
}

export const createExerciseQuery = `-- name: CreateExercise :one
INSERT INTO exercises (name, muscle_group) VALUES ($1, $2) RETURNING id, name, muscle_group`;

export interface CreateExerciseArgs {
	name: string;
	muscleGroup: string;
}

export interface CreateExerciseRow {
	id: number;
	name: string;
	muscleGroup: string;
}

export async function createExercise(
	client: Client,
	args: CreateExerciseArgs
): Promise<CreateExerciseRow | null> {
	const result = await client.query({
		text: createExerciseQuery,
		values: [args.name, args.muscleGroup],
		rowMode: 'array'
	});
	if (result.rows.length !== 1) {
		return null;
	}
	const row = result.rows[0];
	return {
		id: row[0],
		name: row[1],
		muscleGroup: row[2]
	};
}

export const updateExerciseQuery = `-- name: UpdateExercise :one
UPDATE exercises SET name = $1, muscle_group = $2 WHERE id = $3 RETURNING id, name, muscle_group`;

export interface UpdateExerciseArgs {
	name: string;
	muscleGroup: string;
	id: number;
}

export interface UpdateExerciseRow {
	id: number;
	name: string;
	muscleGroup: string;
}

export async function updateExercise(
	client: Client,
	args: UpdateExerciseArgs
): Promise<UpdateExerciseRow | null> {
	const result = await client.query({
		text: updateExerciseQuery,
		values: [args.name, args.muscleGroup, args.id],
		rowMode: 'array'
	});
	if (result.rows.length !== 1) {
		return null;
	}
	const row = result.rows[0];
	return {
		id: row[0],
		name: row[1],
		muscleGroup: row[2]
	};
}

export const deleteExerciseQuery = `-- name: DeleteExercise :one
DELETE FROM exercises WHERE id = $1 RETURNING id, name, muscle_group`;

export interface DeleteExerciseArgs {
	id: number;
}

export interface DeleteExerciseRow {
	id: number;
	name: string;
	muscleGroup: string;
}

export async function deleteExercise(
	client: Client,
	args: DeleteExerciseArgs
): Promise<DeleteExerciseRow | null> {
	const result = await client.query({
		text: deleteExerciseQuery,
		values: [args.id],
		rowMode: 'array'
	});
	if (result.rows.length !== 1) {
		return null;
	}
	const row = result.rows[0];
	return {
		id: row[0],
		name: row[1],
		muscleGroup: row[2]
	};
}
