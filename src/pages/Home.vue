<template>
  <div class="wrapper-content wrapper-content--fixed">
    <section>

      <div class="container" >
        <div class="row">
          <div class="input-field col s12 flex card blue-grey darken-1 ">
              <div  class=" flow-text name_city inp_card">Введите ваш город (eng)</div>
              <input  type="text" class="inp_city col s6" v-model="city">
            <button class="waves-effect waves-light btn inp_card inp_btn" @click="getWeater"><i class="material-icons left">cloud</i>get weather</button>
          </div>
        </div>  

        <!-- город и температура -->
        <div class="row" v-if="info">
          <div class="input-field col s6 card teal lighten-4 flex san" >
            <div>
              <h2>{{info.city.name}} <span>{{info.city.country}}</span></h2>
              <h1>{{(info.list[0].main.temp>0) ? '+': '-'}}{{Math.round(info.list[0].main.temp)}} &#176C</h1>
            </div>

            <!-- иконки погоды -->
           
              <cloudy v-bind:weatherIcon="info.list[0].weather[0].icon"/>

              
          </div> 
          
          
          <!-- показатели погоды на сегодня -->
          <div class="input-field col s6 card teal lighten-4">  
              <div class='card '>

                  <ul class="collapsible card_padding ">
                    <li>
                      <div class="collapsible-header ">
                        <i class="material-icons">access_time</i>
                        время:
                        <span class="badge">{{info.list[0].dt_txt}}</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">
                        <i class="material-icons">invert_colors</i>
                        осадки:
                        <span class="badge">{{info.list[0].weather[0].description}}</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">
                        <i class="material-icons">blur_on</i>
                        влажность:
                        <span class="badge">{{info.list[0].main.humidity}} %</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">
                        <i class="material-icons">trending_flat</i>
                      ветер: 
                        <span class="badge">{{Math.round(info.list[0].wind.speed)}} m/c</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">
                        <i class="material-icons">call_made</i>
                        Направление ветра, град:
                        <span class="badge"> {{info.list[0].wind.deg}}</span></div>
                    </li>
                    <li>
                      <div class="collapsible-header">
                        <i class="material-icons">cloud_download</i>
                        давление: 
                        <span class="badge">{{Math.round(info.list[0].main.grnd_level/1.333)}} мм.р.ст.</span></div>
                    </li>
                  </ul>
                </div>
          </div>

          <!-- переключение день, неделя -->
          <label for="day">
            <input name="group1" type="radio" id="day" value="day" v-model="picked" @click="chartData.rows=weaterDay">
            <span >день</span>
          </label>

          <label for="week">
            <input name="group1" type="radio"  id="week" value="week" v-model="picked" @click="chartData.rows=weaterWeek">
            <span>неделя</span>
          </label>
          <button  class="waves-effect waves-light btn inp_card inp_btn marg_left"
                    v-if="canInstall" @click="onInstall">Установть как приложение</button>              
          <!-- histogram -->
          <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>

        </div>


      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import cloudy from './components/cloudy.vue';

export default {
  components: { cloudy },
  data() {
    this.chartSettings = {
        label: {
          normal: { show: true, position: "top" }
        },
        showLine: ['wind'],
        stack: { 'sell': ['cost', 'profit'] },
        area: true
    }
    return {
      picked: 'day',
      info: null,
      temps: null,
      day: null,
      weaterDay: [],
      weaterWeek: [],
      show: false,
      city: 'Samara',
      loading: true,
        chartData: {
          columns: ['day', 'temp', 'wind', 'rain'],
          rows: []
          // rows: [
          //   // { 'cost': 1523, 'date': '01/01', 'profit': 1523, 'growthRate': 0.12, 'people': 100 },
          //   // { 'cost': 1223, 'date': '01/02', 'profit': 1523, 'growthRate': 0.345, 'people': 100 },
          // ]
        }

    }
  },
  mounted(){
    this.getWeater()
  },
  computed:{
    installPrompt(){
      return this.$store.state.installPrompt;
    },
    canInstall(){
      return this.$store.getters.canInstall;
    } 
  },
  methods:{
    getWeater(){
      axios
        .get("https://api.openweathermap.org/data/2.5/forecast", {
          params: {
            q: this.city,
            units: "metric",
            appid: "fd3150a661c1ddc90d3aefdec0400de4",
            APPID: "appi",
            type: 'like',
            lang: 'ru',
          }
        })
        .then(response => {
          this.info = response.data;

          this.day = response.data.list.map(list => {
            return list.dt_txt;
          });

           this.chartData.rows = [] //очистка массива, перед записью
           this.weaterWeek = [] //очистка массива, перед записью
           this.weaterDay = [] //очистка массива, перед записью

          for (var i = 0; i < this.info.list.length; i++ ){

            // погода на неделю, каждый день на 15:00:00 
            if(this.info.list[i].dt_txt.slice(-8) == "15:00:00"){
              var itemArr = { 'day': new Date(this.info.list[i].dt_txt).toLocaleString("ru", {month: 'long',  day: 'numeric', weekday: 'long',}), 
              'temp': Math.round(this.info.list[i].main.temp), 
              'wind': Math.round(this.info.list[i].wind.speed),
              'rain': (this.info.list[i].rain == undefined) ?  0 : this.info.list[i].rain['3h'],
              };
                this.weaterWeek.push(itemArr)
            }
            // погода на сегодня до 00 00 00
            if(new Date(this.info.list[i].dt_txt).getDate() == new Date().getDate()){
              var itemArr = { 'day': new Date(this.info.list[i].dt_txt).toLocaleString("ru", {month: 'long',  day: 'numeric', hour: 'numeric', minute: 'numeric',}), 
              'temp': Math.round(this.info.list[i].main.temp), 
              'wind': Math.round(this.info.list[i].wind.speed),
              'rain': (this.info.list[i].rain == undefined) ?  0 : this.info.list[i].rain['3h'],
              };
              this.weaterDay.push(itemArr)
            } 
            this.chartData.rows = this.weaterDay;
            this.picked= 'day';
            
          }
          console.log( this.info )
        })
        .catch(error => {
          console.log(error);
          this.error = true;
        })
        .finally(() => (this.loading = false
          
        ))
    },
    onInstall(){
      this.installPrompt.prompt();
    }  
  },


}
</script>
<style lang="scss" scoped>
.marg_left{
  margin-left: 20px;
}
.san{
  justify-content: space-between;
}
.inp_btn{
  margin-left: 20px;
}
.lighten-4 h1{
  padding: 3px;
}
.row {
  margin-bottom: 0px;
}
.inp_card{
  margin: 20px 0px;
}
.name_city{
  width: 400px;
}
.inp-city{
  max-width: 200px;
  padding-top: 20px;
  
}
.container {
    width: 90%;
}
.collapsible{
  box-shadow: none;
}
.flex{
  display: flex;
}
.card_padding{
  padding: 0.3rem;
}
.collapsible-header {
    display: flex;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    line-height: 1.1;
    padding: 0.3rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
</style>
