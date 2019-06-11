<template>
  <div>
      <!-- ясно -->
      <div>
        <h2><i class="large material-icons" style="color: #f4e842" 
                v-show='weatherIcon == "01d"' 
                >brightness_5</i>
        </h2>
        <!--мало облачно -->
        <h2><i class="large material-icons" style="color: #f2f096" 
                v-show='weatherIcon =="02d"' 
                >brightness_6</i>
        </h2>
        <!-- облачно, -->
        <h2><i class="large material-icons" style="color: #57c1f9" 
                v-show='weatherIcon == "03d"' 
                >cloud_queue</i>
        </h2>
        <!-- облачность -->
        <h2><i class="large material-icons" style="color: #2588bc" 
              v-show='weatherIcon == "04d"' 
              >wb_cloudy</i>
        </h2>
        <!-- дождь -->
        <h2><i class="large material-icons" style="color: #58c7ef" 
              v-show='weatherIcon == "09d" || weatherIcon == "10d"' 
              >invert_colors</i>
        </h2>
        <!-- гроза -->
        <h2><i class="large material-icons" style="color: #ed3636" 
              v-show='weatherIcon == "11d"' 
              >invert_colors</i>
        </h2>
        <!-- снег -->
        <h2><i class="large material-icons" style="color: #ffffff" 
              v-show='weatherIcon == "13d"' 
              >ac_unit</i>
        </h2>
        <!-- туман -->
        <h2><i class="large material-icons" style="color: #bcbcbc" 
              v-show='weatherIcon == "50d"' 
              >clear_all</i>
        </h2>
      </div>
    </div> 
  </div>
</template>
<script>
export default {
  props: ['weatherIcon'],
}
</script>