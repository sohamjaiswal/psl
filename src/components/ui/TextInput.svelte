<style lang="scss">
	.text-input,
	.text-input-block {
		padding: 8px 16px;
		outline: none;
		font-size: 1rem;
		color: var(--border);
		border: 1.5px solid var(--primary);
		border-radius: 5px;
		background-color: var(--background);
		width: 100%;
		box-sizing: border-box;
		resize: none;
		transition: all 400ms;
    &:hover {
      border: 1.5px solid var(--hover);
    }
		&:focus {
			border: 1.5px solid var(--primary);
      transform: scale(102%);
		}

	}
</style>

<script lang="ts">
	export let value: string;
	export let variant: "textarea" | "textbox" | "password" | "email" = "textbox";
	export let placeholder: string;
</script>

{#if variant === "textbox"}
	<input type="text" bind:value="{value}" placeholder="{placeholder}" class="text-input" />
{:else if variant === "password"}
	<input type="password" bind:value="{value}" placeholder="{placeholder}" class="text-input" />
{:else if variant === "email"}
	<input type="email" bind:value="{value}" placeholder="{placeholder}" class="text-input" />
{:else if variant === "textarea"}
	<textarea bind:value="{value}" placeholder="{placeholder}" rows="10" class="text-input-block"
	></textarea>
{/if}