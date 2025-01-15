import React, { useRef, useState } from "react";
import "./create.css";
import {
  Box,
  TextField,
  Typography,
  Container,
  Button,
  InputAdornment,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const Create = ({ drawerWidth }) => {
  const navigate = useNavigate();
  let titleInput = useRef();
  let priceInput = useRef();
  //>>>>>>>>>>>>>>>>> React Hook Form >>>>>.
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ title, price }) => {
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Function to send data(fetch)>>>>>>>
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    try {
      const res = await fetch("http://localhost:8000/myData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price: Number(price) }),
      });
      if (!res.ok) throw new Error("Failed to submit data");
      navigate("/");
      titleInput.current.value = "";
      priceInput.current.value = "";
    } catch (error) {
      console.error(error);
      alert("Error submitting data. Please try again.");
    }
  };
  //>>>>>>>>>>>>>>>>> React Hook Form >>>>>.

  return (
    <>
      <Box
        component="main"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          justifyContent: "center",
          mt: "70px",
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Container
          sx={{
            mt: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* title input */}
            <div className="" style={{ marginBottom: "15px" }}>
              <TextField
                sx={{ width: "300px" }}
                label="Title"
                type="text"
                variant="filled"
                {...register("title", {
                  required: true,
                  minLength: 3,
                  pattern: /^[A-Za-z][A-Za-z0-9]*$/,
                })}
                inputRef={titleInput}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ThumbUpAltIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {errors.title?.type === "required" && (
                <p style={{ color: "crimson", fontSize: "15px" }}>
                  Title is required.
                </p>
              )}
              {errors.title?.type === "pattern" && (
                <p style={{ color: "crimson", fontSize: "15px" }}>
                  should start with letter.
                </p>
              )}
              {errors.title?.type === "minLength" && (
                <p style={{ color: "crimson", fontSize: "15px" }}>
                  minLength is 3.
                </p>
              )}
            </div>
            {/* price input */}
            <div className="" style={{ marginBottom: "15px" }}>
              <TextField
                label="Price"
                type="number"
                variant="filled"
                inputRef={priceInput}
                {...register("price", { required: true, minLength: 3 })}
                sx={{ width: "300px" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
              {errors.price?.type === "required" && (
                <p style={{ color: "crimson", fontSize: "15px" }}>
                  Title is required , (Enter the price).
                </p>
              )}
            </div>
            {/*submit button */}
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIosIcon style={{ fontSize: "15px" }} />}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Create;
