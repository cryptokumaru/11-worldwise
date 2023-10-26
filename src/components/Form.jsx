// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const [lat, lng] = useUrlPosition();
  const [isLoadingReverseLookup, setIsLoadingReverseLookup] = useState(false);
  const [errorGeocoding, setErrorGeocoding] = useState("");

  useEffect(() => {
    if (!lat && !lng) return;

    async function getCityData() {
      try {
        setErrorGeocoding("");
        setIsLoadingReverseLookup(true);
        const res = await fetch(
          BASE_URL + "?latitude=" + lat + "&longitude=" + lng
        );
        const data = await res.json();
        // console.log(data);
        if (!data.countryCode)
          throw new Error(
            "There seems to be no city on where you clicked. Please click somewhere else."
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryCode);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorGeocoding(err.message);
      } finally {
        setIsLoadingReverseLookup(false);
      }
    }
    getCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    // console.log(newCity);
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingReverseLookup) return <Spinner />;
  if (errorGeocoding) return <Message message={errorGeocoding} />;
  if (!lat && !lng)
    return <Message message="Please click on map to select city" />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <ReactDatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="MM/dd/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
