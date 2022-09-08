<template>
<div>
  <table>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>price</th>
      <th>rate</th>
    </tr>
    <tr v-for="stock in stocks">
      <td>{{stock.id}}</td>
      <td>{{stock.name}}</td>
      <td>{{stock.price}}</td>
      <td>{{stock.rate}}</td>
    </tr>
  </table>
  {{msg}}
</div>
</template>

<script>
export default {
  name: "Stock",
  data(){
    return{
      msg:"test",
      stocks:[
        {
          id:1,
          name:'test1',
          price:34.12,
          rate:+1.23
        },
        {
          id:2,
          name:'test1',
          price:34.12,
          rate:+1.23
        },
        {
          id:3,
          name:'test1',
          price:34.12,
          rate:+1.23
        },
        {
          id:4,
          name:'test1',
          price:34.12,
          rate:+1.23
        }
      ]
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8081/stock/findAll')
    .then(function (resp){
      _this.stocks =resp.data;
    })
  }
}
</script>

<style scoped>

</style>