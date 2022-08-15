<template>
  <div ref="echarts" class="echart"></div>
</template>

<script>
import * as echart from "echarts";
import jsonp from "jsonp";
import axios from "axios";
import "../config/china";
export default {
  name: "Echart",
  props: {
    titleText: String,
    tooltip: String,
  },
  data() {
    return {
      E: "",
    };
  },
  created() {
    this.option = {
      title: {
        text: this.titleText,
        x: "center",
        textStyle: {
          color: "#DC143C",
        },
      },
      series: [
        {
          type: "map",
          map: "china",
          data: [],
          label: {
            show: true,
            color: "black",
            fontSize: 15,
          },
          zoom: 1.2,
          itemStyle: {
            borderColor: "grey",
          },
          emphasis: {
            label: {
              show: true,
              color: "black",
              fontSize: 17,
            },
            itemStyle: {
              areaColor: "yellow",
            },
          },
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: `地区：{b}<br/>${this.tooltip}：{c}`,
      },
      visualMap: {
        type: "piecewise",
        pieces: [
          { min: 10000 },
          { min: 1000, max: 9999 },
          { min: 100, max: 999 },
          { min: 10, max: 99 },
          { min: 1, max: 9 },
          { value: 0 },
        ],
        inRange: {
          color: ["#fff", "#ffaa85", "#660208"],
        },
        itemWidth: 20,
        itemHeight: 15,
      },
    };
  },
  mounted() {
    this.getData();
    window.addEventListener("resize", this.resized);
  },
  methods: {
    getData() {
      if (this.titleText === "中国昨日新增新冠肺炎确诊病例") {
        axios.post("/api").then((res) => {
          const keyArr = Object.keys(res.data.data.provinceCompare);
          const co = [];
          for (var i = 0; i < keyArr.length; i++) {
            co[i] = {
              name: keyArr[i],
              value: res.data.data.provinceCompare[keyArr[i]],
            };
          }
          const lists = co.map((item) => {
            return { name: item.name, value: item.value.confirmAdd };
          });
          this.option.series[0].data = lists;
          this.E = echart.init(this.$refs.echarts);
          this.E.setOption(this.option);
        });
      } else {
        jsonp(
          "http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427",
          (err, data) => {
            const lists = data.data.list.map((item) => {
              if ((this, this.titleText === "中国现有新冠肺炎确诊病例")) {
                return {
                  name: item.name,
                  value: item.econNum,
                };
              } else {
                return {
                  name: item.name,
                  value: item.value,
                };
              }
            });
            this.option.series[0].data = lists;
            this.E = echart.init(this.$refs.echarts);
            this.E.setOption(this.option);
          }
        );
      }
    },
    resized() {
      this.E.resize();
    },
  },
};
</script>

<style>
 @media screen and (max-width: 600px) {
    .echart{
      width: 580px;
      height: 600px;
    }
 }
  .echart {
    width: 100%;
    height: 600px;
  }
</style>