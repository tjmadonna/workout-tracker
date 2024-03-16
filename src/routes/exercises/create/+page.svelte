<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import SpinnerIcon from '$lib/components/SpinnerIcon.svelte';

	export let data;
	export let form;

	let submitting = false;

	let nameInputValue = '';
	let muscleGroupInputValue = '';

	$: nameInputEmpty = nameInputValue.trim() === '';
	$: muscleGroupInputEmpty = muscleGroupInputValue.trim() === '';
	$: submitButtonDisabled = nameInputEmpty || muscleGroupInputEmpty || submitting;
</script>

<main class="mx-auto max-w-lg px-4 py-16">
	<form
		use:enhance={() => {
			submitting = true;
			return async ({ result }) => {
				submitting = false;

				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					await applyAction(result);
					if (result.type === 'success') {
						nameInputValue = '';
						muscleGroupInputValue = '';
						return;
					}
				}
			};
		}}
		method="post"
		action="?/createExercise"
		class="mx-auto flex flex-col gap-5"
	>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Name</span>
			</div>
			<input
				type="text"
				name="name"
				placeholder="Name"
				class="input input-bordered w-full"
				disabled={submitting}
				bind:value={nameInputValue}
			/>
			<div class="label">
				{#if form?.errors}
					{#each form.errors.filter((e) => e.field == 'name') as error (error)}
						<span class="label-text-alt text-red-700 dark:text-red-400">{error.message}</span>
					{/each}
				{/if}
			</div>
		</label>

		<label class="form-control w-full">
			<div class="label">
				<span class="label-text">Muscle Group</span>
			</div>

			<select
				class="select select-bordered w-full"
				name="musclegroup"
				bind:value={muscleGroupInputValue}
				disabled={submitting}
			>
				<option disabled selected value="">Muscle Group</option>
				{#each data.muscleGroups as muscleGroup (muscleGroup.id)}
					<option value={muscleGroup.id}>{muscleGroup.name}</option>
				{/each}
			</select>

			<div class="label">
				{#if form?.errors}
					{#each form.errors.filter((e) => e.field == 'muscleGroup') as error (error)}
						<span class="label-text-alt text-red-700 dark:text-red-400">{error.message}</span>
					{/each}
				{/if}
			</div>
		</label>

		<button type="submit" class="btn btn-primary" disabled={submitButtonDisabled}>
			{#if submitting}
				<SpinnerIcon />
				Creating
			{:else}
				Create
			{/if}
		</button>
	</form>

	{#if form?.success === false && form?.message}
		<p class="mt-8 text-center text-red-700 dark:text-red-400">{form.message}</p>
	{/if}

	{#if form?.success === true}
		<p class="mt-8 text-center text-green-700 dark:text-green-400">{form.message}</p>
	{/if}
</main>
