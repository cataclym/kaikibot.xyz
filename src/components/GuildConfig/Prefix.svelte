		<div class="indent flex flex-col items-center justify-between">
			<h3>Server prefix</h3>
			<Input
				id="prefix"
				type="text"
				placeholder={Prefix}
				bind:value={Prefix}
				style="width: 4rem; border-radius: 0.5rem;"
			/>
			<Button
				color="primary"
				class="self-end ml-auto mr-auto enabled:cursor-pointer border-transparent"
				disabled={prefixState}><FileCheckSolid />Save</Button
			>
		</div>