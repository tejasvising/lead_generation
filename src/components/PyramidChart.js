import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function SectorExposureTop() {
  const dataPoints = [
    { y: 304.87, legendText: "Manufacturing", indexLabel: "304.87", color: "#3C0663", lineColor: "#ffffff", lineThickness: 2 },
    { y: 277.97, legendText: "Pharmaceuticals", indexLabel: "277.97", color: "#5A108F", lineColor: "#ffffff", lineThickness: 2 },
    { y: 276.34, legendText: "Agricultural", indexLabel: "276.34", color: "#6818A5", lineColor: "#ffffff", lineThickness: 2 },
    { y: 276.34, legendText: "Agrochemicals", indexLabel: "276.34", color: "#8B2FC9", lineColor: "#ffffff", lineThickness: 2 },
    { y: 263, legendText: "Automobiles", indexLabel: "263", color: "#BD68EE", lineColor: "#ffffff", lineThickness: 2 },
  ];

  const options = {
    width: 455,
    height: 210,
    valueRepresents: "area",
    data: [
      {
        type: "pyramid",
        indexLabelPlacement: "inside",
        indexLabelFontColor: "white",
        indexLabelFontSize: 12,
        indexLabelFontWeight: "bold",
        indexLabelFontFamily: "Outfit",
        toolTipContent: "<b>{legendText}</b>: {y}",
        reversed: true,
        dataPoints,
      },
    ],
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", width:'570px' }}>
      {/* Pyramid Chart */}
      <CanvasJSChart options={options} />
        <div
          style={{
            position: "absolute",
            bottom: "90px",
            right: "3px",
            width: "100px",
            height: "50px",
            backgroundColor: "white",
            zIndex: 10
          }}
        />
      {/* Legends shifted to the right */}
      <div style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        marginLeft: "20px",
        marginTop:'80px'
      }}>
        {dataPoints.map((item, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0"
          }}>
            <div style={{
              width: "12px",
              height: "12px",
              backgroundColor: item.color,
              marginRight: "5px",
              borderRadius: "2px"
            }} />
            <span style={{ fontSize: "12px",fontFamily:'Outfit' }}>{item.legendText}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
