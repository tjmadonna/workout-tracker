// Define an array
const muscleGroupsArray = [
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
] as const;

type MuscleGroup = (typeof muscleGroupsArray)[number];

export function getAllMuscleGroups() {
	return muscleGroupsArray;
}

export function doesMuscleGroupExist(muscleGroup: MuscleGroup) {
	return muscleGroupsArray.includes(muscleGroup);
}
