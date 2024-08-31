import { useState, useEffect } from 'react';
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockLineData as data } from "../../data/mockData";
import authHeader from "../../services/auth/auth-header";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/

  // Exemple d'une fonction React pour récupérer et mettre à jour les données
  const fetchAndUpdateData = async () => {

    const response = await fetch('http://localhost:8080/api/admin/comptes/total-solde-by-month', { headers: authHeader() });
    const solde = await response.json(); // Assurez-vous que la réponse est correcte
    return solde.listops;
  };
  const fetchVersement = async () => {
    const Ver ="Versement";
    const response = await fetch(`http://localhost:8080/api/admin/operations/allversbymonthXY?typeOperation=${Ver}`, { headers: authHeader() });
    const versement = await response.json(); // Assurez-vous que la réponse est correcte
    return versement.listOps;
  };
  const fetchRetrait = async () => {
    const Ret ="Retrait"; // type d'operation
    const response = await fetch(`http://localhost:8080/api/admin/operations/allversbymonthXY?typeOperation=${Ret}`, { headers: authHeader() });
    const retrait = await response.json(); // Assurez-vous que la réponse est correcte
    return retrait.listOps;
  };


const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [mockLineData, setMockLineData] = useState([]);

  useEffect(() => {
    const updateData = async () => {
      const solde = await fetchAndUpdateData();
       const versement = await fetchVersement();
       const retrait = await fetchRetrait();

      // Mise à jour du mockLineData avec le solde pour le mois d'août
      const updatedData = [
        {
          id: "versement",
          color: tokens("dark").greenAccent[500],
          data: versement.map((v, index) => ({
            x: v.x,
            y: v.y,
          })),
        },
        {
          id: "retrait",
          color: tokens("dark").blueAccent[300],
          data: retrait.map((r, index) => ({
            x: r.x,
            y: r.y,
          })),
        },
        {
          id: "solde",
          color: tokens("dark").redAccent[200],
          data: solde.map((s, index) => ({
            x: s.x,
            y: s.y,
          })),
        },
      ];

      setMockLineData(updatedData);
    };

    updateData();
  }, []);

// data = mockLineData;








  return (
    <ResponsiveLine
      // data={data}
      data={mockLineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "mois", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "total", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
