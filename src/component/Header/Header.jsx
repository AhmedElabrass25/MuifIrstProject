import * as React from "react";
import { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import img from "../../assets/images/per1.jpg";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import { useLocation, useNavigate } from "react-router-dom";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Menu } from "@mui/icons-material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Header = ({ setTheMode, theMode, drawerWidth }) => {
  const [drawerControl, setDrawerControl] = useState("none");
  const myLists = [
    { text: "home", icon: <HomeIcon />, path: "/" },
    { text: "create", icon: <CreateIcon />, path: "/create" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <>
      <AppBar
        position="static"
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "99",
          ml: { xs: "0px" },
          width: { xs: "100%" },
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px) ` },
        }}
      >
        <Toolbar>
          <IconButton
            onClick={() => setDrawerControl("block")}
            sx={{ display: { xs: "block", sm: "none" }, pb: "0px", mr: "30px" }}
          >
            <Menu sx={{ color: "white" }} />
          </IconButton>
          <Link
            to="/"
            style={{
              flexGrow: 1,
              color: "white",
              textDecoration: "none",
              transition: "all 0.3s ease",
              "&:hover": { fontSize: "21px", color: "rgba(255,255,255,0.8)" },
            }}
            variant="h6"
          >
            My TodoList
          </Link>
          <Typography variant="h6" sx={{ mr: "15px", color: "white" }}>
            Ahmed
          </Typography>
          <Avatar src={img} />
        </Toolbar>
      </AppBar>
      {/* 
      >>>>>>>>>>
      Drawer
      <nav>
      >>>>>>>>> */}
      <Box component="nav">
        <Drawer
          sx={{
            display: { xs: `${drawerControl}`, sm: "block" },
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: `${drawerWidth}px`,
              boxSizing: "border-box",
            },
          }}
          variant={drawerControl === "block" ? "temporary" : "permanent"}
          anchor="left"
          open={true}
          onClose={() => setDrawerControl("none")}
        >
          <List>
            {/* >>>>>>>>>>>>>MOde icon>>>>>>>>>>>>>>>>> */}
            <ListItem
              className=""
              sx={{ width: "100%", justifyContent: "center", padding: "0px" }}
            >
              <IconButton
                sx={{ my: "6px" }}
                onClick={() => {
                  localStorage.setItem(
                    "theme",
                    theMode == "light" ? "dark" : "light"
                  );
                  setTheMode(theMode == "light" ? "dark" : "light");
                }}
              >
                {theMode == "light" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </ListItem>
            <Divider />

            {/* >>>>>>>>>>>>>Links>>>>>>>>>>>>>>>>> */}
            {myLists.map((list, index) => {
              return (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: `${
                      location.pathname === list.path ? "#a9a5a542" : ""
                    }`,
                  }}
                >
                  <ListItemButton onClick={() => navigate(list.path)}>
                    <ListItemIcon>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            {/* >>>>>>>>>>>close Drawer Button>>>>> */}
            <ListItem
              onClick={() => setDrawerControl("none")}
              sx={{ display: { sm: "none" } }}
            >
              <ListItemButton
                variant="secondary"
                sx={{ justifyContent: "space-between" }}
              >
                <ListItemIcon>
                  <ArrowCircleLeftIcon />
                </ListItemIcon>

                <ListItemText primary="Close" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
