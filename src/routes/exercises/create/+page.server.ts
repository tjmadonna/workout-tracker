import { createExercise } from '$lib/server/services/exercises.js';
import { getAllMuscleGroups } from '$lib/server/services/muscleGroups.js';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { databasePool } from '$lib/server/database.js';

export async function load() {
	const muscleGroups = getAllMuscleGroups().map((muscleGroup) => {
		return {
			id: muscleGroup,
			name: muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1).toLowerCase()
		};
	});

	return {
		muscleGroups
	};
}

const CreateExercise = z.object({
	name: z.string().min(1, 'Name is required'),
	muscleGroup: z.enum(getAllMuscleGroups(), {
		errorMap: () => ({ message: 'Muscle Group must be a valid muscle group' })
	})
});

export const actions = {
	createExercise: async ({ request }) => {
		const data = await request.formData();
		const exerciseName = data.get('name');
		const muscleGroup = data.get('musclegroup');

		console.log('ExerciseName: ', exerciseName, ', MuscleGroup: ', muscleGroup);
		const validationResult = CreateExercise.safeParse({
			name: exerciseName,
			muscleGroup: muscleGroup
		});
		if (!validationResult.success) {
			console.log(validationResult.error);
			const errors = validationResult.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				};
			});
			console.log(errors);
			return fail(400, { success: false, errors });
		}

		try {
			const id = await createExercise(databasePool, validationResult.data);
			if (!id) {
				throw new Error('Failed to save the exercise');
			}
		} catch (e) {
			console.error(e);
			return fail(500, { success: false, message: 'Failed to save the exercise' });
		}

		return { success: true, message: 'Exercise created successfully' };
	}
};
