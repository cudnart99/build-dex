import React, { useEffect, useState } from "react";
import { StyledWrapper } from "./styled";
import useDebounceWindowResize from "@hook/useDebounceWindowResize";
import useCustomState from "@hook/useCustomState";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ state, setState }) {
  const { width } = useDebounceWindowResize();
  useEffect(() => {
    setState({
      pricePair: data[data.length - 1]?.price,
    });
  }, []);
  const data = [
    {
      time: "7:00 PM",
      price: 0.051,
    },
    {
      time: "8:00 PM",
      price: 0.067,
    },
    {
      time: "9:00 PM",
      price: 0.056,
    },
    {
      time: "10:00 PM",
      price: 0.061,
    },
    {
      time: "11:00 PM",
      price: 0.062,
    },
    {
      time: "12:00 PM",
      price: 0.067,
    },
    {
      time: "1:00 AM",
      price: 0.07,
    },
  ];

  const customMouseOver = (e) => {
    console.log(e, "helo123");
  };

  return (
    <StyledWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          onMouseMove={(e) => {
            if (e.isTooltipActive) {
              setState({ pricePair: e?.activePayload[0]?.value });
            }
          }}
          onMouseLeave={(e) => {
            if (!e.isTooltipActive) {
              setState({ pricePair: data[data.length - 1]?.price });
            }
          }}
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="grad1" x1="0" y1="1" x2="0" y2="0">
              <stop
                offset="25%"
                stopColor="rgba(0, 180, 114, 0.4)"
                stopOpacity={1}
              />
              <stop
                offset="50%"
                stopColor="rgba(0, 213, 135)"
                stopOpacity={1}
              />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="time" stroke="white" />
          <YAxis dataKey="price" stroke="white" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            strokeWidth={3}
            stroke="#00895C"
            fill="url(#grad1)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledWrapper>
  );
}
