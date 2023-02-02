import React, { useEffect } from "react";
import { GraphWrapper } from "./styled";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { stepSummary } from "@pages/trade/staking/config";
import moment from "moment/moment";

export default function StakingGraph({ typeStake, apr, amount, dataClaim }) {
  useEffect(() => {
    const stepTime = stepSummary;
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.logo.disabled = true;
    var data = [];

    var gradientGreen = new am4core.LinearGradient();
    gradientGreen.addColor(am4core.color("green"));
    gradientGreen.addColor(am4core.color("white"));
    gradientGreen.rotation = 90;
    var gradientGray = new am4core.LinearGradient();
    gradientGray.addColor(am4core.color("gray"));
    gradientGray.addColor(am4core.color("white"));
    gradientGray.rotation = 90;

    if (dataClaim) {
      var stepClaim = 0;
      switch (dataClaim?.stakeTime?.type) {
        case 180: {
          stepClaim = 3;
          break;
        }
        case 360: {
          stepClaim = 6;
          break;
        }
        case 540: {
          stepClaim = 9;
          break;
        }
        default: {
          stepClaim = 0;
        }
      }
      data.push({
        typeDate: "Stake date",
        reward: 0,
        date: moment
          .unix(moment(dataClaim?.stakeDate, "DD-MM-YYYY HH:mm:ss").unix())
          .format("DD-MM-YYYY HH:mm:ss"),
        colorPropertyFields: gradientGreen,
        colorStroke: "green",
      });
      var firstTime = false;
      for (let i = 1; i < stepClaim; i++) {
        if (
          moment().unix() -
            (moment(dataClaim?.stakeDate, "DD-MM-YYYY HH:mm:ss").unix() +
              stepTime * (i + 1)) <
            0 &&
          firstTime === false
        ) {
          firstTime = true;
          data.push({
            typeDate: `Reward ${i}`,
            reward: ((dataClaim?.reward * i) / stepClaim).formatCurrency(),
            date: moment
              .unix(
                moment(dataClaim?.stakeDate, "DD-MM-YYYY HH:mm:ss").unix() +
                  stepTime * i
              )
              .format("DD-MM-YYYY HH:mm:ss"),
            colorPropertyFields: gradientGray,
            colorStroke: "gray",
          });
        }
        data.push({
          typeDate: `Reward ${i}`,
          reward: ((dataClaim?.reward * i) / stepClaim).formatCurrency(),
          date: moment
            .unix(
              moment(dataClaim?.stakeDate, "DD-MM-YYYY HH:mm:ss").unix() +
                stepTime * i
            )
            .format("DD-MM-YYYY HH:mm:ss"),
        });
      }
      data.push({
        typeDate: `Unlock date`,
        reward: dataClaim?.reward?.formatCurrency(),
        date: moment
          .unix(
            moment(dataClaim?.stakeDate, "DD-MM-YYYY HH:mm:ss").unix() +
              stepTime * stepClaim
          )
          .format("DD-MM-YYYY HH:mm:ss"),
      });
    } else {
      var stepStake = 1; // stepStake = 1 cho flexible
      switch (typeStake) {
        case 180: {
          stepStake = 3;
          break;
        }
        case 360: {
          stepStake = 6;
          break;
        }
        case 540: {
          stepStake = 9;
          break;
        }
        default: {
          stepStake = 1;
        }
      }
      data.push({
        typeDate: "Stake date",
        reward: 0,
        date: moment.unix(moment().unix()).format("DD-MM-YYYY HH:mm:ss"),
        colorPropertyFields: gradientGray,
        colorStroke: "gray",
      });
      for (let i = 1; i < stepStake; i++) {
        data.push({
          typeDate: `Reward ${i}`,
          reward: ((amount * apr * i) / stepStake / 100).formatCurrency(),
          date: moment
            .unix(moment().unix() + stepTime * i)
            .format("DD-MM-YYYY HH:mm:ss"),
        });
      }
      data.push({
        typeDate: `Unlock date`,
        reward: ((amount * apr) / 100).formatCurrency(),
        date: moment
          .unix(moment().unix() + stepTime * stepStake)
          .format("DD-MM-YYYY HH:mm:ss"),
      });
    }

    chart.data = data;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    var label = categoryAxis.renderer.labels.template;
    label.wrap = true;
    label.maxWidth = 70;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.dataFields.category = "typeDate";
    categoryAxis.startLocation = 0.4;
    categoryAxis.endLocation = 0.6;
    categoryAxis.tooltip.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.min = 0;

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "typeDate";
    lineSeries.dataFields.valueY = "reward";
    lineSeries.tooltip.getFillFromObject = false;
    lineSeries.tooltip.background.fill = am4core.color("rgba(43,43,43,0.3)");
    lineSeries.tooltipText =
      `[bold]{typeDate}[\bold]  \n [bold]Date :[\bold] {date} \n  [bold]Reward :[\bold]  {reward} ${process.env.REACT_APP_STABLE_TOKEN_SYMBOL}`;
    lineSeries.fillOpacity = 0.5;
    lineSeries.stroke = "color";
    lineSeries.fill = "color";
    lineSeries.strokeWidth = 2;
    lineSeries.propertyFields.stroke = "colorStroke";
    lineSeries.propertyFields.fill = "colorPropertyFields";

    let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.circle.radius = 3;
    bullet.circle.fill = "black";
    bullet.circle.strokeWidth = 0;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
  }, [amount, typeStake, dataClaim]);
  return (
    <GraphWrapper>
      <div id="chartdiv"></div>
    </GraphWrapper>
  );
}
