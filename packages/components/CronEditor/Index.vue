<style lang="scss">
.no-vue3-cron-div {
    .language {
        position: absolute;
        right: 25px;
        z-index: 1;
    }

    .el-tabs {
        box-shadow: none;
    }

    

    .tabBody {
        overflow: auto;

        .radio-group {
            display: flex;
            flex-direction: column;
            align-items:flex-start;
            margin: 20px 0;

            .el-radio {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .long {
                .el-select {
                    width: 200px;
                }
            }

            .el-input-number {
                width: 120px;
            }
        }
    }

    .myScroller {
        &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
            height: 1px;
        }

        &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            background-color: skyblue;
            background-image: -webkit-linear-gradient(
                    45deg,
                    rgba(255, 255, 255, 0.2) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, 0.2) 50%,
                    rgba(255, 255, 255, 0.2) 75%,
                    transparent 75%,
                    transparent
            );
        }

        &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #ededed;
            border-radius: 10px;
        }
    }

    .bottom {
        width: 100%;
        margin-top: 5px;
        display: flex;
        flex-direction:row;
        align-items: center;
        justify-content: space-around;

        .value {
            float: left;
            font-size: 14px;
            vertical-align: middle;

            span:nth-child(1) {
                color: red
            }
        }
    }
}
</style>
<template>
    <div class="no-vue3-cron-div">
        <el-button
          class="language"
          type="text"
          @click="state.language = state.language === 'en' ? 'cn' : 'en'"
          >{{ state.language === 'en' ? 'cn' : 'en' }}</el-button
        >
        <el-tabs type="border-card">
            <el-tab-pane v-if="state.second.isShow">
                <template #label>
                    <span><i class="el-icon-date"></i> {{ state.text.Seconds.name }}</span>
                </template>
                <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
                    <el-radio-group v-model="state.second.type" class="radio-group">
                        <el-radio  label="every"> {{ state.text.Seconds.every }} </el-radio>
                        <el-radio label="interval" >
                            {{ state.text.Seconds.interval[0] }}
                            <el-input-number
                                v-model="state.second.incrementIncrement"
                                :min="1" :max="60" ></el-input-number>
                            {{ state.text.Seconds.interval[1] || "" }}
                            <el-input-number :disabled="!state.second.enableIncrementStart"
                                v-model="state.second.incrementStart"
                                :min="0" :max="59" ></el-input-number>
                            {{ state.text.Seconds.interval[2] || "" }}
                            <el-switch v-model="state.second.enableIncrementStart"
                                    active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </el-radio>
                        <el-radio class="long" label="multi" >
                            {{ state.text.Seconds.specific }}
                            <el-select multiple
                                v-model="state.second.specificSpecific">
                                <el-option
                                    v-for="(val, index) in 60" 
                                        :key="index" :value="val - 1">
                                        {{ val - 1 }}
                                </el-option>
                            </el-select>
                        </el-radio>
                        <el-radio label="range" >
                            {{ state.text.Seconds.cycle[0] }}
                            <el-input-number
                                v-model="state.second.rangeStart"
                                :min="0" :max="59" ></el-input-number>
                            {{ state.text.Seconds.cycle[1] || "" }}
                            <el-input-number
                                v-model="state.second.rangeEnd" 
                                :min="1" :max="60" ></el-input-number>
                            {{ state.text.Seconds.cycle[2] || "" }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="state.minute.isShow">
                <template #label>
                    <span><i class="el-icon-date"></i> {{ state.text.Minutes.name }}</span>
                </template>
                <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
                    <el-radio-group v-model="state.minute.type" class="radio-group">
                        <el-radio label="every"> {{ state.text.Minutes.every }} </el-radio>
                        <el-radio label="interval" >
                            {{ state.text.Minutes.interval[0] }}
                            <el-input-number
                                v-model="state.minute.incrementIncrement"
                                :min="1" :max="60" ></el-input-number>
                            {{ state.text.Minutes.interval[1] }}
                            <el-input-number  :disabled="!state.minute.enableIncrementStart"
                                v-model="state.minute.incrementStart"
                                :min="0" :max="59" ></el-input-number>
                            {{ state.text.Minutes.interval[2] || "" }}
                            <el-switch v-model="state.minute.enableIncrementStart"
                                    active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </el-radio>
                        <el-radio class="long" label="multi">
                            {{ state.text.Minutes.specific }}
                            <el-select multiple
                                v-model="state.minute.specificSpecific">
                                <el-option
                                    v-for="(val, index) in 60"
                                        :key="index" :value="val - 1">
                                        {{ val - 1 }}
                                </el-option>
                            </el-select>
                        </el-radio>
                        <el-radio label="range" >
                            {{ state.text.Minutes.cycle[0] }}
                            <el-input-number
                                v-model="state.minute.rangeStart"
                                :min="0" :max="59" ></el-input-number>
                            {{ state.text.Minutes.cycle[1] }}
                            <el-input-number
                                v-model="state.minute.rangeEnd"
                                :min="1" :max="60" ></el-input-number>
                            {{ state.text.Minutes.cycle[2] }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="state.hour.isShow">
                <template #label>
                    <span><i class="el-icon-date"></i> {{ state.text.Hours.name }}</span>
                </template>
                <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
                    <el-radio-group v-model="state.hour.type" class="radio-group">
                        <el-radio label="every"> {{ state.text.Hours.every }} </el-radio>
                        <el-radio label="interval" >
                            {{ state.text.Hours.interval[0] }}
                            <el-input-number
                                v-model="state.hour.incrementIncrement"
                                :min="0" :max="23" ></el-input-number>
                            {{ state.text.Hours.interval[1] }}
                            <el-input-number :disabled="!state.hour.enableIncrementStart"
                                v-model="state.hour.incrementStart"
                                :min="0" :max="23" ></el-input-number>
                            {{ state.text.Hours.interval[2] }}
                            <el-switch v-model="state.hour.enableIncrementStart"
                                    active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </el-radio>
                        <el-radio class="long" label="multi">
                            {{ state.text.Hours.specific }}
                            <el-select multiple v-model="state.hour.specificSpecific">
                                <el-option
                                    v-for="(val, index) in 24"
                                        :key="index" :value="val - 1">
                                        {{ val - 1 }}
                                </el-option >
                            </el-select>
                        </el-radio>
                        <el-radio label="range">
                            {{ state.text.Hours.cycle[0] }}
                            <el-input-number
                                v-model="state.hour.rangeStart"
                                :min="0" :max="22" ></el-input-number>
                            {{ state.text.Hours.cycle[1] }}
                            <el-input-number
                                v-model="state.hour.rangeEnd"
                                :min="1" :max="23" ></el-input-number>
                            {{ state.text.Hours.cycle[2] }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="state.day.isShow">
                <template #label>
                    <span><i class="el-icon-date"></i> {{ state.text.Day.name }}</span>
                </template>
                <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
                    <el-radio-group v-model="state.day.type" class="radio-group">
                        <el-radio label="every"> {{ state.text.Day.every }} </el-radio>
                        <el-radio label="uncertain"> {{ state.text.Day.uncertain }} </el-radio>
                        <el-radio label="interval">
                            {{ state.text.Day.interval[0] }}
                            <el-input-number
                                v-model="state.day.incrementIncrement"
                                :min="1" :max="31" ></el-input-number>
                            {{ state.text.Day.interval[1] }}
                            <el-input-number :disabled="!state.day.enableIncrementStart"
                                v-model="state.day.incrementStart"
                                :min="1" :max="31" ></el-input-number>
                            {{ state.text.Day.interval[2] }}
                            <el-switch v-model="state.day.enableIncrementStart"
                                    active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </el-radio>
                        <el-radio class="long" label="multi">
                            {{ state.text.Day.specific }}
                            <el-select multiple v-model="state.day.specificSpecific">
                                <el-option
                                    v-for="(val, index) in 31"
                                        :key="index" :value="val">
                                        {{ val }}
                                </el-option >
                            </el-select>
                        </el-radio>
                        <el-radio label="last"> {{ state.text.Day.lastDay }} </el-radio>
                        <el-radio label="nearest">
                            {{ state.text.Day.nearestWeekday[0] }}
                            <el-input-number
                                v-model="state.day.nearestWeekday"
                                :min="1" :max="31" ></el-input-number>
                            {{ state.text.Day.nearestWeekday[1] }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="state.month.isShow">
                <template #label>
                    <span><i class="el-icon-date"></i> {{ state.text.Month.name }}</span>
                </template>
                <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
                    <el-radio-group v-model="state.month.type" class="radio-group">
                        <el-radio label="every"> {{ state.text.Month.every }} </el-radio>
                        <el-radio label="interval">
                            {{ state.text.Month.interval[0] }}
                            <el-input-number
                                v-model="state.month.incrementIncrement"
                                :min="1" :max="12" ></el-input-number>
                            {{ state.text.Month.interval[1] }}
                            <el-input-number  :disabled="!state.month.enableIncrementStart"
                                v-model="state.month.incrementStart"
                                :min="0" :max="12" ></el-input-number>
                            <el-switch v-model="state.month.enableIncrementStart"
                                active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </el-radio>
                        <el-radio class="long" label="multi">
                            {{ state.text.Month.specific }}
                            <el-select multiple v-model="state.month.specificSpecific">
                                <el-option
                                    v-for="(val, index) in 12"
                                        :key="index" :label="val" :value="val">
                                </el-option>
                            </el-select>
                        </el-radio>
                        <el-radio label="range">
                            {{ state.text.Month.cycle[0] }}
                            <el-input-number
                                v-model="state.month.rangeStart"
                                :min="1" :max="12" ></el-input-number>
                            {{ state.text.Month.cycle[1] }}
                            <el-input-number
                                v-model="state.month.rangeEnd"
                                :min="1" :max="12" ></el-input-number>
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="state.week.isShow">
                <template #label>
                    <span><i class="el-icon-date"></i> {{ state.text.Week.name }}</span>
                </template>
                <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
                    <el-radio-group v-model="state.week.type" class="radio-group">
                        <el-radio label="every"> {{ state.text.Week.every }} </el-radio>
                        <el-radio label="interval"  class="long" >
                            {{ state.text.Week.interval[0] }}
                            <el-input-number
                                v-model="state.week.incrementIncrement"
                                :min="1" :max="7" ></el-input-number>
                            {{ state.text.Week.interval[1] }}
                            <el-select  v-model="state.week.incrementStart" 
                                    :disabled="!state.week.enableIncrementStart">
                                <el-option
                                    v-for="(val, index) in state.weekVals"
                                    :key="index"
                                    :label="state.text.Week.selects[index]"
                                    :value="val" ></el-option>
                            </el-select>
                            {{ state.text.Week.interval[2] }}
                            <el-switch v-model="state.week.enableIncrementStart"
                                    active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </el-radio>
                        <el-radio class="long" label="multi">
                            {{ state.text.Week.specific }}
                            <el-select multiple v-model="state.week.specificSpecific">
                                <el-option
                                    v-for="(val, index) in state.weekVals"
                                    :key="index"
                                    :label="state.text.Week.selects[index]"
                                    :value="val" ></el-option>
                             </el-select>
                        </el-radio>
                        <el-radio label="last">
                            {{ state.text.Week.lastWeek[0] }} 
                            <el-select v-model="state.week.lastSpecificDomDay">
                                <el-option
                                    v-for="(val, index) in state.weekVals"
                                    :key="index"
                                    :label="state.text.Week.selects[index]"
                                    :value="val" ></el-option>
                             </el-select>
                             {{ state.text.Week.lastWeek[1] || "" }}
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
            <el-tab-pane v-if="state.year.isShow">
                <template #label>
                    <span><i class="el-icon-date"></i> {{ state.text.Year.name }}</span>
                </template>
                <div class="tabBody myScroller" :style="{'max-height': maxHeight}">
                    <el-radio-group v-model="state.year.type" class="radio-group">
                        <el-radio label="every"> {{ state.text.Year.every }} </el-radio>
                        <el-radio label="interval">
                            {{ state.text.Year.interval[0] }}
                            <el-input-number
                                v-model="state.year.incrementIncrement"
                                :min="1" :max="99" ></el-input-number>
                            {{ state.text.Year.interval[1] }}
                            <el-input-number  :disabled="!state.year.enableIncrementStart"
                                v-model="state.year.incrementStart"
                                :min="2018" :max="2118" ></el-input-number>
                            <el-switch v-model="state.year.enableIncrementStart"
                                active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </el-radio>
                        <el-radio class="long" label="multi">
                            {{ state.text.Year.specific }}
                            <el-select filterable multiple
                                v-model="state.year.specificSpecific">
                                <el-option
                                    v-for="(val, index) in 100"
                                    :key="index"
                                    :label="2017 + val"
                                    :value="2017 + val"
                                ></el-option>
                            </el-select>
                        </el-radio>
                        <el-radio label="range">
                            {{ state.text.Year.cycle[0] }}
                            <el-input-number
                                v-model="state.year.rangeStart"
                                :min="2018" :max="2118" ></el-input-number>
                            {{ state.text.Year.cycle[1] }}
                            <el-input-number
                                v-model="state.year.rangeEnd"
                                :min="2018" :max="2118" ></el-input-number>
                        </el-radio>
                    </el-radio-group>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="bottom">
            <div class="value">
                <span>
                cron预览:
                </span>
                <el-tag type="primary">
                    {{ state.cron }}
                </el-tag>
            </div>
            <div class="buttonDiv">
                <el-button type="primary" size="small" @click.stop="handleChange">{{ state.text.Save }}</el-button>
                <el-button type="primary" size="small" @click="close">{{ state.text.Close }}</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Language from "./language";
import {watch, reactive, computed, toRefs, defineComponent} from "vue";



//type: every, multi, range, interval, uncertain, last
export default defineComponent({
    name: "CronEditor",
    props: {
        cronValue: String,
        i18n: {},
        maxHeight: {}
    },
    setup(props, {emit}) {
        const {i18n} = toRefs(props)
        const state = reactive({
            language: i18n.value,
            cronItemNum: 0,
            second: {
                isShow: false,
                type: "every",
                enableIncrementStart: true,
                incrementStart: 1,
                incrementIncrement: 5,
                rangeStart: 0,
                rangeEnd: 1,
                specificSpecific: [],
            },
            minute: {
                isShow: true,
                type: "every",
                enableIncrementStart: true,
                incrementStart: 1,
                incrementIncrement: 5,
                rangeStart: 0,
                rangeEnd: 1,
                specificSpecific: [],
            },
            hour: {
                isShow: true,
                type: "every",
                enableIncrementStart: true,
                incrementStart: 1,
                incrementIncrement: 5,
                rangeStart: 0,
                rangeEnd: 1,
                specificSpecific: [],
            },
            day: {
                isShow: true,
                type: "every",
                enableIncrementStart: true,
                incrementStart: 1,
                incrementIncrement: 1,
                rangeStart: 0,
                rangeEnd: 1,
                specificSpecific: [],
                nearestWeekday: 1,
            },
            month: {
                isShow: true,
                type: "every",
                enableIncrementStart: true,
                incrementStart: 1,
                incrementIncrement: 5,
                rangeStart: 0,
                rangeEnd: 1,
                specificSpecific: [],
            },
            week: {
                isShow: true,
                type: "every",
                enableIncrementStart: true,
                incrementStart: 1,
                incrementIncrement: 1,
                specificSpecific: [],
                lastSpecificDomDay: 1,
            },
            year: {
                isShow: false,
                type: "every",
                enableIncrementStart: true,
                incrementStart: 2017,
                incrementIncrement: 1,
                rangeStart: 0,
                rangeEnd: 0,
                specificSpecific: [],
            },
            output: {
                second: "",
                minute: "",
                hour: "",
                day: "",
                month: "",
                week: "",
                year: "",
            },
            text: computed(() => Language[state.language || "cn"]),
            weekVals: computed(() => {
                if (state.cronItemNum === 7)
                    return [1, 2, 3, 4, 5, 6, 7];
                else if (state.cronItemNum === 5)
                    return [0, 1, 2, 3, 4, 5, 6];
                else return [];
            }),
            secondsText: computed(() => {
                let seconds = "";
                switch (state.second.type) {
                    case "every":
                        seconds = "*";
                        break;
                    case "interval":
                        const start = state.second.enableIncrementStart ? state.second.incrementStart : "*";
                        seconds = start + "/" + state.second.incrementIncrement;
                        break;
                    case "multi":
                        state.second.specificSpecific.map((val) => { seconds += val + ","; });
                        seconds = seconds.slice(0, -1);
                        break;
                    case "range":
                        seconds = state.second.rangeStart + "-" + state.second.rangeEnd;
                        break;
                }
                return seconds;
            }),
            minutesText: computed(() => {
                let minutes = "";
                switch (state.minute.type) {
                    case "every":
                        minutes = "*";
                        break;
                    case "interval":
                        const start = state.minute.enableIncrementStart ? state.minute.incrementStart : "*";
                        minutes = start + "/" + state.minute.incrementIncrement;
                        break;
                    case "multi":
                        state.minute.specificSpecific.map((val) => { minutes += val + ","; });
                        minutes = minutes.slice(0, -1);
                        break;
                    case "range":
                        minutes = state.minute.rangeStart + "-" + state.minute.rangeEnd;
                        break;
                }
                return minutes;
            }),
            hoursText: computed(() => {
                let hours = "";
                switch (state.hour.type) {
                    case "every":
                        hours = "*";
                        break;
                    case "interval":
                        const start = state.hour.enableIncrementStart ? state.hour.incrementStart : "*";
                        hours = start + "/" + state.hour.incrementIncrement;
                        break;
                    case "multi":
                        state.hour.specificSpecific.map((val) => { hours += val + ","; });
                        hours = hours.slice(0, -1);
                        break;
                    case "range":
                        hours = state.hour.rangeStart + "-" + state.hour.rangeEnd;
                        break;
                }
                return hours;
            }),
            daysText: computed(() => {
                let days = "";
                switch (state.day.type) {
                    case "every":
                        days = "*";
                        break;
                    case "uncertain":
                        days = "?";
                        break;
                    case "interval":
                        const start = state.day.enableIncrementStart ? state.day.incrementStart : "*";
                        days = start + "/" + state.day.incrementIncrement;
                        break;
                    case "multi":
                        state.day.specificSpecific.map((val) => { days += val + ","; });
                        days = days.slice(0, -1);
                        break;
                    case "last":
                        days = "L";
                        break;
                    case "nearest":
                        days = state.day.nearestWeekday + "W";
                        break;
                }
                return days;
            }),
            weeksText: computed(() => {
                let weeks = "";
                switch (state.week.type) {
                    case "every":
                        weeks = "*";
                        break
                    case "uncertain":
                        weeks = "?";
                        break;
                    case "interval":
                        const start = state.week.enableIncrementStart ? state.week.incrementStart : "?";
                        weeks = start + "/" + state.week.incrementIncrement;
                        break;
                    case "multi":
                        state.week.specificSpecific.map((val) => { weeks += val + ","; });
                        weeks = weeks.slice(0, -1);
                        break;
                    case "last":
                        weeks = state.week.lastSpecificDomDay + "L";
                        break;
                }
                return weeks;
            }),
            monthsText: computed(() => {
                let months = "";
                switch (state.month.type) {
                    case "every":
                        months = "*";
                        break;
                    case "interval":
                        const start = state.month.enableIncrementStart ? state.month.incrementStart : "*";
                        months = start + "/" + state.month.incrementIncrement;
                        break;
                    case "multi":
                        state.month.specificSpecific.map((val) => { months += val + ","; });
                        months = months.slice(0, -1);
                        break;
                    case "range":
                        months = state.month.rangeStart + "-" + state.month.rangeEnd;
                        break;
                }
                return months;
            }),
            yearsText: computed(() => {
                let years = "";
                switch (state.year.type) {
                    case "every":
                        years = "*";
                        break;
                    case "interval":
                        const start = state.year.enableIncrementStart ? state.year.incrementStart : "*";
                        years = start + "/" + state.year.incrementIncrement;
                        break;
                    case "multi":
                        state.year.specificSpecific.map((val) => { years += val + ","; });
                        years = years.slice(0, -1);
                        break;
                    case "range":
                        years = state.year.rangeStart + "-" + state.year.rangeEnd;
                        break;
                }
                return years;
            }),
            cron: computed(() => {
                if (state.cronItemNum === 7) {
                    return `${state.secondsText || "*"} ${state.minutesText ||
                    "*"} ${state.hoursText || "*"} ${state.daysText ||
                    "*"} ${state.monthsText || "*"} ${state.weeksText ||
                    "?"} ${state.yearsText || "*"}`;
                }
                else if (state.cronItemNum === 5) {
                    return `${state.minutesText || "*"} ${state.hoursText || 
                    "*"} ${state.daysText || "*"} ${state.monthsText || 
                    "*"} ${state.weeksText || "*"}`;
                }
                else {
                    return "";
                }
            }),
        });
        watch(() => props.cronValue, (newCron) => {
            if(typeof(newCron) !== 'string' || !newCron) return false
            let crons = newCron.split(" ");
            state.cronItemNum = crons.length;
            
            if ((state.cronItemNum!==7) && (state.cronItemNum!==5)) return false

            // 解析seconds
            if (state.cronItemNum === 7) {
                state.second.isShow = true;
                let secondsText = crons[0].trim();
                if (secondsText === "*") {
                    state.second.type = "every";
                }else if (secondsText.includes("/")) {
                    state.second.type = "interval";
                    let secondsTexts = secondsText.split("/");
                    state.second.enableIncrementStart = secondsTexts[0] !== "*";
                    state.second.incrementStart = (secondsTexts[0] !== "*")? parseInt(secondsTexts[0]) : 0;
                    state.second.incrementIncrement = parseInt(secondsTexts[1])
                }else if (secondsText.includes(",") || isFinite(secondsText)) {
                    state.second.type = "multi";
                    state.second.specificSpecific = secondsText.split(",").map(item => parseInt(item));
                }else if (secondsText.includes("-")) {
                    state.second.type = "range";
                    let secondsTexts = secondsText.split("-");
                    state.second.rangeStart = parseInt(secondsTexts[0])
                    state.second.rangeEnd = parseInt(secondsTexts[1])
                }
            }

            // 解析minutes
            const minutesIndex = (state.cronItemNum === 7) ? 1 : 0;
            let minutesText = crons[minutesIndex].trim();
            if (minutesText === "*") {
                state.minute.type = "every";
            }else if (minutesText.includes("/")) {
                state.minute.type = "interval";
                let minutesTexts = minutesText.split("/");
                state.minute.enableIncrementStart = minutesTexts[0] !== "*";
                state.minute.incrementStart = (minutesTexts[0] !== "*")? parseInt(minutesTexts[0]) : 0;
                state.minute.incrementIncrement = parseInt(minutesTexts[1])
            }else if (minutesText.includes(",") || isFinite(minutesText)) {
                state.minute.type = "multi";
                state.minute.specificSpecific = minutesText.split(",").map(item => parseInt(item));
            }else if (minutesText.includes("-")) {
                state.minute.type = "range";
                let minutesTexts = minutesText.split("-");
                state.minute.rangeStart = parseInt(minutesTexts[0])
                state.minute.rangeEnd = parseInt(minutesTexts[1])
            }

            // 解析hours
            const hoursIndex = (state.cronItemNum === 7) ? 2 : 1;
            let hoursText = crons[hoursIndex].trim();
            if (hoursText === "*") {
                state.hour.type = "every";
            }else if (hoursText.includes("/")) {
                state.hour.type = "interval";
                let hoursTexts = hoursText.split("/");
                state.hour.enableIncrementStart = hoursTexts[0] !== "*";
                state.hour.incrementStart = (hoursTexts[0] !== "*")? parseInt(hoursTexts[0]) : 0;
                state.hour.incrementIncrement = parseInt(hoursTexts[1])
            }else if (hoursText.includes(",") || isFinite(hoursText)) {
                state.hour.type = "multi";
                state.hour.specificSpecific = hoursText.split(",").map(item => parseInt(item));
            }else if (hoursText.includes("-")) {
                state.hour.type = "range";
                let hoursTexts = hoursText.split("-");
                state.hour.rangeStart = parseInt(hoursTexts[0])
                state.hour.rangeEnd = parseInt(hoursTexts[1])
            }

            // 解析days
            const daysIndex = (state.cronItemNum === 7) ? 3 : 2;
            let daysText = crons[daysIndex].trim();
            if (daysText === "*") {
                state.day.type = "every";
            } else if (daysText.includes("/")) {
                state.day.type = "interval";
                let daysTexts = daysText.split("/");
                state.day.enableIncrementStart = daysTexts[0] !== "*";
                state.day.incrementStart = (daysTexts[0] !== "*")? parseInt(daysTexts[0]) : 1;
                state.day.incrementIncrement = parseInt(daysTexts[1])
            }else if (daysText.includes(",") || isFinite(daysText)) {
                state.day.type = "multi";
                state.day.specificSpecific = daysText.split(",").map(item => parseInt(item));
            }else if (daysText.includes("-")) {
                state.day.type = "range";
                let daysTexts = daysText.split("-");
                state.day.rangeStart = parseInt(daysTexts[0])
                state.day.rangeEnd = parseInt(daysTexts[1])
            }else if (daysText === "L") {
                state.day.type = "last";
            }else if (daysText.endsWith("W")) {
                state.day.type = "nearest";      
                state.day.nearestWeekday = parseInt(daysText.replaceAll("W", ""))
            }else if (daysText === "?") {
                state.day.type = "uncertain";
            }


            // 解析weeks
            const weeksIndex = (state.cronItemNum === 7) ? 5 : 4;
            let weeksText = crons[weeksIndex].trim();
            if (weeksText === "*") {
                state.week.type = "every";
            }else if (weeksText.includes("/")) {
                state.week.type = "interval";
                let weeksTexts = weeksText.split("/");
                state.week.enableIncrementStart = weeksTexts[0] !== "*";
                state.week.incrementStart = (weeksTexts[0] !== "*")? parseInt(weeksTexts[0]) : 1;
                state.week.incrementIncrement = parseInt(weeksTexts[1])
            }else if (weeksText.includes(",") || isFinite(weeksText)) {
                state.week.type = "multi";
                state.week.specificSpecific = weeksText.split(",").map(item => parseInt(item));
            }else if (weeksText.endsWith("L")) {
                state.week.type = "last";
                state.week.lastSpecificDomDay = parseInt(weeksText.replaceAll("L", ""))
            }else if (weeksText === "?") {
                state.week.type = "uncertain";
            }
           

            // 解析months
            const monthsIndex = (state.cronItemNum === 7) ? 4 : 3;
            let monthsText = crons[monthsIndex].trim();
            if (monthsText === "*") {
                state.month.type = "every";
            }else if (monthsText.includes("/")) {
                state.month.type = "interval";
                let monthsTexts = monthsText.split("/");
                state.month.enableIncrementStart = monthsTexts[0] !== "*";
                state.month.incrementStart = (monthsTexts[0] !== "*")? parseInt(monthsTexts[0]) : 1;
                state.month.incrementIncrement = parseInt(monthsTexts[1])
            }else if (monthsText.includes(",") || isFinite(monthsText)) {
                state.month.type = "multi";
                state.month.specificSpecific = monthsText.split(",").map(item => parseInt(item));
            }else if (monthsText.includes("-")) {
                state.month.type = "range";
                let monthsTexts = monthsText.split("-");
                state.month.rangeStart = parseInt(monthsTexts[0])
                state.month.rangeEnd = parseInt(monthsTexts[1])
            }

            // 解析years
            if (state.cronItemNum === 7) {
                state.year.isShow = true;
                let yearsText = crons[6].trim();
                if (yearsText === "*") {
                    state.year.type = "every";
                }else if (yearsText.includes("/")) {
                    state.year.type = "interval";
                    let yearsTexts = yearsText.split("/");
                    state.year.enableIncrementStart = yearsTexts[0] !== "*";
                    state.year.incrementStart = (yearsTexts[0] !== "*")? parseInt(yearsTexts[0]) : 2017;
                    state.year.incrementIncrement = parseInt(yearsTexts[1])
                }else if (yearsText.includes(",") || isFinite(yearsText)) {
                    state.year.type = "multi";
                    state.year.specificSpecific = yearsText.split(",").map(item => parseInt(item));
                }else if (yearsText.includes("-")) {
                    state.year.type = "range";
                    let yearsTexts = yearsText.split("-");
                    state.year.rangeStart = parseInt(yearsTexts[0])
                    state.year.rangeEnd = parseInt(yearsTexts[1])
                }
            }

        }, {
          immediate: true
        })
        const getValue = () => {
            return state.cron
        }
        const close = () => {
            emit('close')
        }
        const handleChange = () => {
            emit('cron-change', state.cron)
            close()
        }
        const rest = (data) => {
            for (let i in data) {
                if (data[i] instanceof Object) {
                    this.rest(data[i]);
                } else {
                    switch (typeof data[i]) {
                        case "object":
                            data[i] = [];
                            break;
                        case "string":
                            data[i] = "";
                            break;
                    }
                }
            }
        }
        return {
            state,
            getValue,
            close,
            handleChange,
            rest
        }
    },
});
</script>
