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

// Brigham and Women's Hospital, 75 Francis St, Boston, MA 02115
const BWH_LATITUDE = 42.3355;
const BWH_LONGITUDE = -71.1066;

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDate(now: Date): string {
  const weekday = now.toLocaleDateString("en-US", { weekday: "long" });
  const month = now.toLocaleDateString("en-US", { month: "long" });
  const day = now.getDate();
  return `${weekday}, ${month} ${day}${getOrdinalSuffix(day)}`;
}

function formatTime(now: Date): string {
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

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
  const [phraseVisible, setPhraseVisible] = useState(true);
  const [tempF, setTempF] = useState<number | null>(null);
  const [time, setTime] = useState(formatTime(new Date()));
  const [date, setDate] = useState(formatDate(new Date()));
  const [toCelsius, setFahrenheit] = useState(false);

  useEffect(() => {
    const handleWeatherUpdate = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: BWH_LATITUDE,
              longitude: BWH_LONGITUDE,
              current: "temperature_2m",
              temperature_unit: "fahrenheit",
              timezone: "America/New_York",
            },
          },
        );

        setTempF(response.data.current.temperature_2m);
      } catch (error) {
        console.log("failed to fetch weather near Brigham and Women's Hospital");
      }
    };

    handleWeatherUpdate().then();

    // Weather doesn't change quickly, refresh every 5 minutes
    const weatherInterval = setInterval(handleWeatherUpdate, 5 * 60 * 1000);

    // Keep the date/time display live using the visitor's own clock
    const clockInterval = setInterval(() => {
      const now = new Date();
      setTime(formatTime(now));
      setDate(formatDate(now));
    }, 1000);

    return () => {
      clearInterval(weatherInterval);
      clearInterval(clockInterval);
    };
  }, []);

  // Fades the subtitle out and back in on a loop. The text only ever changes
  // while it's fully faded out, and only every other fade-out, so it reads as
  // "fade out, fade in, fade out, switch text, fade in" rather than a jarring
  // swap while the old phrase is still partway visible.
  useEffect(() => {
    const FADE_DURATION = 800;
    const DISPLAY_DURATION = 2500;
    let fadeOutCount = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleFadeOut = () => {
      timeoutId = setTimeout(() => {
        setPhraseVisible(false);
        timeoutId = setTimeout(() => {
          fadeOutCount += 1;
          if (fadeOutCount % 2 === 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          }
          setPhraseVisible(true);
          scheduleFadeOut();
        }, FADE_DURATION);
      }, DISPLAY_DURATION);
    };

    scheduleFadeOut();

    return () => clearTimeout(timeoutId);
  }, [phrases.length]);

  const displayTemp =
    tempF === null
      ? null
      : toCelsius
        ? Number((((tempF as number) - 32) * (5 / 9)).toFixed(1))
        : Number((tempF as number).toFixed(1));

  const handleTempChange = () => {
    setFahrenheit(!toCelsius);
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
                className={`fade-text ${phraseVisible ? "fade-visible" : "fade-hidden"}`}
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
                {displayTemp === null ? "--" : displayTemp}° {toCelsius ? "C" : "F"}
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
