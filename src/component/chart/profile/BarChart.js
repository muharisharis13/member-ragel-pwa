import React from "react";
import { Bar } from "react-chartjs-2";
import { IoCubeOutline } from "react-icons/io5";
import styled from "styled-components";

export const BarChart = ({ to }) => {
  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: `Sales Profit`,
        data: [1, 12, 19, 3, 5, 2, 3, 2, 3],
        fill: false,
        backgroundColor: "rgb(255, 191, 0)",
        borderColor: "rgba(255, 230, 154, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <Container className="container-fluid mt-4">
      <div className="row justify-content-between pr-3 my-1">
        <Overview className="col-sm-6">
          Product Sold
          <Title>678</Title>
        </Overview>
        <Dollar className="bg-primary text-white p-4    ">
          <IoCubeOutline size={50} />
        </Dollar>
      </div>
      <Bar data={data} options={options} />
      <div className="text-center mt-4">
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 7px;
  box-shadow: 2px 6px 6px 4px rgba(0, 0, 0, 0.1);
`;

const Overview = styled.div`
  font-weight: bold;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 18pt;
`;

const Dollar = styled.div`
  border-radius: 130px;
`;
