import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import ApexChart from "./apexchart";
import PieChart from './piechart';
import "../components/dashcss.css";
// icons
import { IoIosPin } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import { PiPhoneCallFill } from "react-icons/pi";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

function Dashboard() {
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [regionsCount, setRegionsCount] = useState({
    countries: 0,
    states: 0,
    districts: 0,
  });

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(
          "https://covid-19-statistics.p.rapidapi.com/regions",
          {
            headers: {
              "x-rapidapi-key":
                "858695dc56msh590c2c38c34e4b7p1d3c6ajsn2ba39804483e",
              "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
            },
          }
        );

        const regions = response.data.data;
        setCountryData(regions);
        setRegionsCount({
          countries: regions.length,
          states: 0,
        });
      } catch (error) {
        console.error("Error fetching regions data:", error);
      }
    };

    fetchRegions();
  }, []);

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setSubmittedText([...submittedText, inputText]);
      setInputText("");
    }
  };

  return (
    <div className="col col-lg-12">
      <div className="col-lg-12 d-flex fw-bold p-4 name justify-content-between">
        <span>Region DashBoard</span>
        <div>
          <a href="https://github.com/Vengatramanan123" target="_blank" rel="noopener noreferrer">
            <FaGithub className="me-3 text-black" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="me-3 text-black" />
          </a>
          <a href="https://www.linkedin.com/in/vengat-ramanan-5989b1192/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-black" />
          </a>
        </div>
      </div>
      <div className="d-flex row mt-5">
        <div className="rounded row col-lg-11 ms-5">
          <div className="card card1 shadow-sm col col-lg-3">
            <div className="fw-bold">User Details</div>
            <span className="fs-5 ms-1 mt-3">
              <FaUser />
              &nbsp;&nbsp;
              <span className="fs-6">Rambo</span>
            </span>
            <span className="fs-4">
              <IoIosPin /> &nbsp;
              <span className="fs-6">New York, California, USA - 009</span>
            </span>
            <span className="fs-5 ms-1">
              <IoMailUnread />
              &nbsp;&nbsp;
              <span className="fs-6">rambo21@gmail.com</span>
            </span>
            <span className="fs-5 ms-1">
              <PiPhoneCallFill />
              &nbsp;&nbsp;
              <span className="fs-6">123-4569-7458</span>
            </span>
          </div>

          <div className="card card2 shadow-sm col-lg-3 ms-5">
            <span className="fw-bold">
              <FaGlobeAmericas /> &nbsp;Total Regions
            </span>
            <div className="ms-4">{regionsCount.countries}</div>
            <br />
            <span className="fw-bold">
              <FaChartLine /> &nbsp;Highest Sales
            </span>
            <div className="ms-4">148</div>
          </div>

          <div className="card card3 shadow-sm col-lg-5 ms-5">
            <PieChart />
          </div>
        </div>
      </div>

      <div className="d-flex row col-lg-12 ms-3">
        <div className="card col-lg-8 ms-4 mt-4 shadow-sm">
          <ApexChart />
        </div>
        <div className="card col-lg-3 ms-4 mt-4 shadow-sm">
          <div className="fw-bold">Add Notes</div>
          <br />
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-100 bg-light text-black"
              value={inputText}
              onChange={handleChange}
              placeholder="Enter your text here"
            />
            <br />
            <button type="submit" className="btn btn-success d-flex text-end">
              Submit
            </button>
          </form>
          <br />
          <span className="fw-bold">Notes:</span>
          {submittedText.length > 0 && (
            <div>
              <ol>
                {submittedText.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
      <div className="card col-lg-11 mt-3 ms-5">
        <div className="fw-bold p-3">Region Summary</div>
        <div className="card scrollable-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Region Name</th>
                <th>Region Code</th>
              </tr>
            </thead>
            <tbody>
              {countryData.map((country, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{country.name}</td>
                  <td>{country.iso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <hr />
        <div className="fw-bold p-3 d-flex justify-content-center">
          &copy; Created By Vengatramanan | 2024
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
