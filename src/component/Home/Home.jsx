import React, { useEffect, useState } from "react";
import "./home.css";
import Button from "@mui/material/Button";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Container, IconButton, Paper, Typography } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";
const Home = ({ drawerWidth }) => {
  const [allData, setAllData] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");

  // console.log(allData);
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //  Function to get data(fetch)>>>>>>>
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function getData() {
    let res = await fetch("http://localhost:8000/myData");
    if (res.ok) {
      const data = await res.json();
      setAllData(data);
      let sumOfPrice = data
        .map((item) => item.price)
        .reduce((x, y) => {
          return x + y;
        }, 0);
      setTotalPrice(sumOfPrice);
    } else {
      console.error(`Failed to delete item. Status: ${res.status}`);
    }
  }
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //  Function to delete item (fetch)>>>>>>>
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  async function deleteItem(id) {
    let res = await fetch(`http://localhost:8000/myData/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      console.log(`Item with ID ${id} deleted successfully!`);
      getData();
    } else {
      console.error(`Failed to delete item. Status: ${res.status}`);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "70px",
        ml: { xs: "0px" },
        width: { xs: "100%" },
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: "50px",
        }}
      >
        {allData.length > 0 ? (
          allData.map((data) => {
            return (
              <Paper
                key={data.id}
                sx={{
                  position: "relative",
                  width: "250px",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                  alignItems: "center",
                  pt: "30px",
                  mb: "15px",
                  px: "10px",
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {data.title}
                </Typography>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  ${data.price}
                </Typography>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "-7px",
                    right: "0px",
                    mb: "5px",
                    mt: "2px",
                  }}
                  onClick={() => deleteItem(data.id)}
                >
                  <HighlightOffIcon style={{ fontSize: "22px" }} />
                </IconButton>
              </Paper>
            );
          })
        ) : (
          <p>There is no data</p>
        )}

        <Typography
          varuant="secondary"
          sx={{
            fontSize: "18px",
            display: "flex",
            alignContent: "center",
            letterSpacing: "2px",
            mt: "20px",
          }}
        >
          Total Price <ForwardIcon sx={{ color: "orange", mx: "15px" }} /> ${" "}
          {totalPrice}
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
