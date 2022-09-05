import React, { useEffect, useState } from "react";
import instance from "../axios";
import "./search.css";
import {Link} from "react-router-dom";

export default function ViewAllJobs() {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("")

    async function search() {
        try {
            let url = `/title?title=${title}`;
            const response = await instance.get(url);
            if (response.status === 200) {
                setData(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleTitle = (e)=>{
        setTitle(e.target.value)
    }


    useEffect(() => {
        search();
    }, [title]);

    return (
        <div className="all-products">
            <main>
                <h1>ALL JOBS</h1>

                <form>
                    <div className="search">
                        <input className="title" type="text" id="title" placeholder="search jobs..." onChange={handleTitle} name="title"/>
                    </div>
                </form>

                <Link to="/">Back to Jobs around You</Link>

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
                            <p> Loading...</p>
                        )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
