<script lang="ts">
	let firstCurrencyAmount = 0;
	let secondCurrencyAmount = 0;
	let firstSelectedCurrency: string;
	let secondSelectedCurrency: string;
	let currencyToExchange: string = "USD";

	const getExchangeRates = async () => {
		const res = await fetch(`https://v6.exchangerate-api.com/v6/274062c683b64fd6c7857c64/latest/${currencyToExchange}`);
		const data = await res.json();
		return data;
	};

	function converte(
		firstCurr: number,
		secoondCurr: number,
		order: 'firstToSecond' | 'secondToFirst'
	) {
		if (order === 'firstToSecond') {
			secondCurrencyAmount = 
		}
	}
</script>

{#await getExchangeRates()}
	<p>awaiting...</p>
{:then data}
	<select bind:value={firstSelectedCurrency}>
		{#each Object.entries(data.conversion_rates) as [key, value]}
			<option value={key}>
				{key}
			</option>
		{/each}
	</select>
	<input bind:value={firstCurrencyAmount} on:input={() => console.log()} />
	<select bind:value={secondCurrencyAmount}>
		{#each Object.entries(data.conversion_rates) as [key, value]}
			<option value={key}>
				{key}
			</option>
		{/each}
	</select>
	<input bind:value={secondCurrencyAmount} on:input={() => converte(firstCurrencyAmount, secondCurrencyAmount, 'secondToFirst')} />
{:catch error}
	<p>oh noes.</p>
{/await}
