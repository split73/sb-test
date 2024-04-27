<script lang="ts">
  import { onMount } from 'svelte';
  import {round} from 'mathjs';
  import axios from 'axios';

  const api_url = "https://v6.exchangerate-api.com/v6/91130d58e95fda8b75eec1ae"

  $: selected1 = "RUB"
  $: selected2 = "RUB"

  $: currency1 = 1
  $: currency2 = 1

  $: result1 = 1
  $: result2 = 1

  $: flag = true

  
  async function getCodes(){
    let res = await axios.get(`${api_url}/codes`)
    return [...res.data.supported_codes]
  }

  let codes = []

  onMount(async () => {
    codes = await getCodes();
    console.log(codes)
  });
  

  async function getCurrency(currency1: string, currency2: string){
    let response = await axios.get(`${api_url}/latest/${currency1}`)
    return response.data.conversion_rates[currency2]
  }

  async function handleCurrent1(e){
    selected1 = e.target.value
    if(selected1 == selected2){
      result1 = 1
      result2 = 1
      currency1 = await getCurrency(selected1, selected2)
    } else {
      flag = true
      result1 = 1
      currency1 = await getCurrency(selected1, selected2)
      result2 = round(result1 * currency1, 3)
    }
  }

  async function handleCurrent2(e){
    selected2 = e.target.value
    if(selected1 == selected2){
      result1 = 1
      result2 = 1
      currency2 = await getCurrency(selected2, selected1)
    } else {
      flag = false
      result2 = 1
      currency2 = await getCurrency(selected2, selected1)
      result1 = round(result2 * currency2 , 3)
    }
  }

  function res1(e){
    result1 = e.target.value
    if(selected1 == selected2)
      result2 = result1
    else {
      if(flag)
        result2 = round(result1 * currency1, 3)
      else 
        result2 = round(result1 / currency2, 3)
    } 
  }

  function res2(e){
    result2 = e.target.value
    if(selected1 == selected2)
      result1 = result2
    else {
      if(!flag)
        result1 = round(result2 * currency2, 3)
      else 
        result1 = round(result2 / currency1, 3)
    }
  }

</script>

<main>
  <div class="card">
    <div>
      <select on:change={handleCurrent1}>
        <option value="RUB">RUB</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {#each codes as code}
          <option value={code[0]}>{code[0]}</option>
        {/each}
      </select>
      <input type="number" value={result1} on:change={res1}>
    </div>

    <div>
      <select on:change={handleCurrent2}>
        <option value="RUB">RUB</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        {#each codes as code}
          <option value={code[0]}>{code[0]}</option>
        {/each}
      </select>
      <input type="number" value={result2} on:change={res2}>
    </div>
  </div>
</main>