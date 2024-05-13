<script lang="ts">

	let firstCurrencyAmount = 0;
	let secondCurrencyAmount = 0;
	let firstSelectedCurrency: string = 'USD';
	let secondSelectedCurrency: string = 'USD';
	let firstFetchedRates: any;
	let secondFetchedRates: any;

	async function getExchangeRates(currencyToExchange: string) {
		const res = await fetch(
			`https://v6.exchangerate-api.com/v6/274062c683b64fd6c7857c64/latest/${currencyToExchange}`
		);
		const data = await res.json();
		firstCurrencyAmount = 0;
		secondCurrencyAmount = 0;
		return data;
	}

	const firstExchangeRates = (firstSelectedCurrency: string) => {
		let tmpRates = getExchangeRates(firstSelectedCurrency).then(
			(data) => (firstFetchedRates = data)
		);
		return tmpRates;
	};
	const secondExchangeRates = (secondSelectedCurrency: string) => {
		let tmpRates = getExchangeRates(secondSelectedCurrency).then(
			(data) => (secondFetchedRates = data)
		);
		return tmpRates;
	};

	function converte(
		firstCurr: number,
		secoondCurr: number,
		order: 'firstToSecond' | 'secondToFirst'
	) {
		if (order === 'firstToSecond') {
			firstCurrencyAmount =
				secondFetchedRates.conversion_rates[firstSelectedCurrency] * secoondCurr;
		} else {
			secondCurrencyAmount = firstFetchedRates.conversion_rates[secondSelectedCurrency] * firstCurr;
		}
	}
</script>

{#await firstExchangeRates(firstSelectedCurrency)}
	<select>
		<option>fetching...</option>
	</select>
	<input />
{:then data}
	<select
		bind:value={firstSelectedCurrency}
		on:change={() => getExchangeRates(firstSelectedCurrency)}
	>
		{#each Object.entries(data.conversion_rates) as [key, value]}
			<option value={key}>
				{key}
			</option>
		{/each}
	</select>
	<input
		bind:value={firstCurrencyAmount}
		on:input={() => converte(firstCurrencyAmount, secondCurrencyAmount, 'secondToFirst')}
	/>
{:catch error}
	<p>error</p>
{/await}

{#await secondExchangeRates(secondSelectedCurrency)}
	<select>
		<option>fetching...</option>
	</select>
	<input />
{:then data}
	<select
		bind:value={secondSelectedCurrency}
		on:change={() => getExchangeRates(secondSelectedCurrency)}
	>
		{#each Object.entries(data.conversion_rates) as [key, value]}
			<option value={key}>
				{key}
			</option>
		{/each}
	</select>
	<input
		bind:value={secondCurrencyAmount}
		on:input={() => converte(firstCurrencyAmount, secondCurrencyAmount, 'firstToSecond')}
	/>
{:catch error}
	<p>error</p>
{/await}

