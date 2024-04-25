

<template>
  <div class="cron">
    <el-input v-model="cronValue" placeholder="cron表达式...">
      <template #append>
        <el-popover :visible="cronPopover" width="700px">
            <cron-editor
                :cron-value="cronValue"
                @cron-change="changeCron"
                @close="cronPopover=false"
                max-height="400px"
                i18n="cn"
            ></cron-editor>
            <template #reference>
                <el-button @click="cronPopover = !cronPopover">设置</el-button>
            </template>
        </el-popover>
      </template>
    </el-input>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue';



const cronPopover = ref(false)
const cronValue = ref('')


function changeCron(value: string) {
  console.log(value)
  cronValue.value = value
}

</script>

<style lang="scss" scoped>
.cron {
  width: 700px;
  margin: 0 auto;
  margin-top: 100px;
  h1 {
    font-size: 50px;
    text-align: center;
  }
}
</style>
