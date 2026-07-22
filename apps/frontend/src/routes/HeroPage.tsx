import { useAuth0 } from "@auth0/auth0-react";
import "../styles/HeroPage.css";
// import 'animate.css';
// import {Button} from "@mui/material";
// @import "~animate.css/animate.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import { IconButton, Snackbar, Switch, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Weather } from "common/src/backend_interfaces/weather.ts";

function addAnimationClass(e: Event) {
  e.preventDefault(); // Prevent the default action (navigation)

  // Get the link element and its href
  const linkElement = document.getElementById("toMapClump");
  // @ts-expect-error works
  const href = linkElement.getAttribute("href");
  let timer = 0;

  if (linkElement) {
    linkElement.classList.add("animate__bounceOutRight");
    timer = 1000;
  }
  // Remove and add classes as before
  // @ts-expect-error works
  linkElement.classList.remove("animate__slower", "animate__infinite");

  // Wait for the animation to complete (adjust the duration as needed)
  setTimeout(() => {
    // Navigate to the link's href
    // @ts-expect-error works
    window.location.href = href;
  }, timer); // 1000ms = 1s
}

function HeroPage() {
  const { loginWithRedirect } = useAuth0();
  const [disclaimerOpen, setDisclaimerOpen] = useState(true);

  const phrases: string[] = [
    "Helping our patients and their families get back to what matters most.",
    "Excellence in medical research and patient care, our commitment continues.",
    "Dedicated to a century of leadership in healthcare and patient service.",
    "Leading the way in comprehensive healthcare, where every patient is family.",
    "Together in health, every step of the way—because family matters.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [temp, setTemp] = useState(0);
  const [time, setTime] = useState("15:03");
  const [date, setDate] = useState("Tuesday, April 30th");
  const [toCelsius, setFahrenheit] = useState(false);

  useEffect(() => {
    const handleWeatherUpdate = async () => {
      try {
        const response = await axios.get("/api/weather");
        const weather: Weather = response.data;

        console.log(weather);
        if (toCelsius) {
          setTemp(Number(((weather.temp - 32) * (5 / 9)).toFixed(2)));
        } else {
          setTemp(weather.temp);
        }

        setTime(String(weather.time));
        setDate(String(weather.date));
      } catch (error) {
        console.log("that failed bro");
      }
    };

    handleWeatherUpdate().then();
    console.log(temp);
    console.log(time);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 4000); // Change phrases every 3 seconds

    // Set up interval to fetch weather data every 5 seconds
    const weatherInterval = setInterval(handleWeatherUpdate, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(weatherInterval);
    };
  }, [phrases.length, temp, time, date, toCelsius]);

  const handleTempChange = () => {
    setFahrenheit(!toCelsius);
    if (toCelsius) {
      // F to C
      setTemp(Number(((temp - 32) * (5 / 9)).toFixed(2)));
    } else {
      // C to F
      setTemp(Number((temp * (9 / 5) + 32).toFixed(2)));
    }
  };

  const handleDisclaimerClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setDisclaimerOpen(false);
  };

  const action = (
    <>
      <IconButton onClick={handleDisclaimerClose} sx={{ color: "white" }}>
        <CloseIcon color={"inherit"} />
      </IconButton>
    </>
  );

  return (
    <div className={"image-area"}>
      {/*  main body */}
      <div className={"gradient row m-0 "}>
        {/*Hospital Text*/}
        <div className={"mainbox col-8 p-5  "}>
          <div>
            <div className={"header "}>
              Welcome to Brigham and Women's Hospital
            </div>

            <div className={"subtitle"}>
              <span
                key={currentIndex}
                className={currentIndex === currentIndex ? "fade-in-out" : ""}
              >
                {phrases[currentIndex]}
              </span>
            </div>
          </div>
          <Snackbar
            open={disclaimerOpen}
            onClose={handleDisclaimerClose}
            message={
              // disclaimer should be red
              <p style={{ color: "#ff0000" }}>
                This website is a term project exercise for WPI CS 3733 Software
                Engineering (Prof. Wong) and is not to be confused with the
                actual Brigham & Women’s Hospital website
              </p>
            }
            action={action}
          />
        </div>

        {/*Right hand Column*/}
        <div className={"rightBox col-4 p-0 d-flex flex-column "}>
          {/*Info Display*/}
          <div className={"boxPad"}>
            {/*Time and Date Display*/}
            <div className={"align-content-center"}>
              <div className={" tempBox timeDate "}>
                <p className={"wordPad"}>{date}</p>
              </div>
              <div className={" tempBox timeDate"}>
                <p className={"wordPad"}>{time}</p>
              </div>
            </div>

            {/*Temperature Display*/}
            <div className={"tempBox paragraph "}>
              <p className={"wordPad"}>
                {temp}° {toCelsius ? "C" : "F"}
              </p>
              <DeviceThermostatIcon sx={{ color: "#ffffff", fontSize: 45 }}>
                {" "}
              </DeviceThermostatIcon>
            </div>
            <div className={"tempBox"}>
              <FormControlLabel
                sx={{ color: "#ffffff" }}
                value="Fstart"
                control={
                  <Switch
                    onChange={handleTempChange}
                    color="default"
                    size={"medium"}
                  ></Switch>
                }
                label={toCelsius ? "C" : "F"}
                labelPlacement={"start"}
              />
            </div>
          </div>

          {/*Go to map*/}
          <div className={"boxMarg d-flex justify-content-end paragraph "}>
            <a
              href="/admin-map"
              id={"toMapClump"}
              className={
                "toMap animate__animated animate__slower animate__headShake animate__infinite"
              }
              // @ts-expect-error works
              onClick={addAnimationClass}
            >
              <button className={"button-class"}> Go To Map</button>
              <ArrowCircleRightIcon
                sx={{
                  color: "#ffffff",
                  width: "1.75em",
                  height: "1.75em",

                  marginBottom: 1,
                }}
              ></ArrowCircleRightIcon>
            </a>
          </div>

          {/*admin login*/}
          <div className={"boxPad d-flex justify-content-end paragraph "}>
            <p className={"hero-staff-login"}>
              {" "}
              Staff Member?{" "}
              <a onClick={() => loginWithRedirect()}>
                <u>Log in</u>
              </a>
            </p>
            {/*<p>Log In</p>*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
