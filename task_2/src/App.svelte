<script lang="ts">
  import {round} from 'mathjs'

  $: currency1 = 90
  $: currency2 = 1

  $: result1 = 90
  $: result2 = 1

  function handleCurrent1(e){
    currency1 = e.target.value

    
    result2 = result1 / currency1
  }

  function handleCurrent2(e){
    currency2 = e.target.value

    result1 = round(result1 / (currency2 * result2 ), 2)
  }

  function res1(e){
    result1 = e.target.value
    result2 = round(result1 / currency2, 2)
  }

  function res2(e){
    result2 = e.target.value
    result1 = round(result2 * currency1, 2)
  }

  

</script>

<main>
  <div class="card">
    <div>
      <select on:change={handleCurrent1}>
        <option value="1">rub</option>
        <option value="90">usd</option>
        <option value="97">euro</option>
      </select>

      <input type="number" value={result1} on:change={res1}>
    </div>

    <div>
      <select on:change={handleCurrent2}>
        <option value="90">usd</option>
        <option value="97">euro</option>
        <option value="1">rub</option>
      </select>

      <input type="number" value={result2} on:change={res2}>
    </div>
  </div>

  <div>
    {currency1}
    {result1}
  </div>

  <div>
    {currency2}
    {result2}
  </div>
</main>

<style>

</style>