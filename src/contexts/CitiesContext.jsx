import { useState, useEffect, createContext, useContext } from "react";
const BASE_URL = "http://localhost:8000/cities";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL);
        // console.log(citiesData);
        const data = await res.json();
        setCities(data);
        // console.log(data);
      } catch {
        alert("There was an errro loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      console.log(BASE_URL + "/" + id);
      const res = await fetch(BASE_URL + "/" + id);
      //   const res = await fetch("http://localhost:8000/cities/73930385");
      // console.log(citiesData);
      const data = await res.json();
      setCurrentCity(data);
      //   console.log(data);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
}
export { CitiesProvider, useCities };
