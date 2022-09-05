import React, { useEffect, useState } from "react";
import instance from "../axios";
import {Link} from "react-router-dom";
import "./search.css";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

export default function Search() {
    const [title, setTitle] = useState("")

    const [data, setData] = useState([]);
    const [long, setLong] = useState(``);
    const [lat, setLat] = useState(``)




    async function bylocation() {
        try {
            //for testing because there are no nigerian jobs in the database
            // let url = `/?long=103.851&lat=1.30156&title=${title}`;

            let url = `/?long=${long}&lat=${lat}&title=${title}`;
            const response = await instance.get(url);
            if (response.status === 200) {
                console.log(long)
                console.log(lat)
                console.log(title)
                console.log(response.data.data)
                if (response.data.data != null){
                    setData(response.data.data);
                }else{
                    setData([])
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleTitle = (e)=>{
        setTitle(e.target.value)
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            let numLat = position.coords.latitude
            let textLat = numLat.toString()
            setLat(textLat)

            let numLong = position.coords.longitude
            let textLong = numLong.toString()
            setLong(textLong)
        });
        bylocation();
    }, [long,lat,title]);

    const libraries = ["places"];
    const mapContainerStyles = "map-container";
    const center = {
        lat: 1.30156,
        lng: 103.851,
    }
    const options = {
        disableDefaultUI: true,
        zoomControl: true,

    }

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries
    });

    if (!isLoaded) return <div>Loading...</div>

    return (

            <main>

                <div>
                    <GoogleMap
                        zoom={12.4}
                        center={center}
                        mapContainerClassName={mapContainerStyles}
                        options={options}
                    >
                        {data.map((marker) => (
                            <Marker
                                // key={marker.title}
                                position={{lat: marker.latitude, lng: marker.longitude}}
                            />
                        ))}

                    </GoogleMap>
                </div>



                <div className="location-style">
                        <h3>5 NEAR BY JOBS WITH IN 5KM RADIUS</h3>

                        {data.length > 0 ? (
                            data.slice(0, 5).map((jobs) => {
                                return (
                                    <>
                                        <button className="jobs">
                                            {jobs.title}
                                        </button>
                                    </>
                                );
                            })
                        ) : (
                            <p> No Job Near You</p>
                        )}
                </div>





                <div className="search-style">
                <h2>NEAR BY JOBS</h2>

                <form>
                    <div className="search">
                        <input className="title" type="text" id="title" placeholder="search jobs..." onChange={handleTitle} name="title"/>
                    </div>
                </form>
                    <Link to="/alljobs">View all Jobs</Link>

                <div class="">
                    <table className="content-table">
                        <tbody>
                        {data.length > 0 ? (
                            data.map((jobs) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{jobs.title}</td>
                                            <td></td>
                                        </tr>
                                    </>
                                );
                            })
                        ) : (
                            <p>No Job found in your location</p>
                        )}
                        </tbody>
                    </table>
                </div>
                </div>
            </main>

    );
}
