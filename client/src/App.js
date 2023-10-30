import { useState, useEffect } from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/style.css";
import { Routes, Route } from "react-router-dom";
import Cards from "./components/Cards";
import CardsDetails from "./components/CardsDetails";
import Outlets from "./components/Outlets";
import Orders from "./components/Orders";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./appConstants";
import { GETDATA } from "./redux/Actions/Action";

function App() {
  const getData = useSelector(state => state.GetDataReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setData(getData);
  }, [data]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/menus`).then((res) => {
      const { menus } = res.data.data;
      dispatch(GETDATA(menus));
    }).catch((err) => {
      console.log(err);
    })
  }, []);


  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  const searchResults = data.filter((el) => el.rname.toLowerCase().includes(searchQuery));

  return (
    <div className="App">
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Cards searchResults={searchResults} />} />
        <Route path="/cart/:id" element={<CardsDetails />} />
        <Route path="/location" element={<Outlets />} />
        <Route path="/order" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
