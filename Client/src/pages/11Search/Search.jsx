import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import './Search.css';
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from '@mui/material/Button';

const Search = ({ firstName, lastName, userPicturePath }) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card card-margin">
                        <div className="card-body">
                            <div className="row search-body">
                                <div className="col-lg-12">
                                    <div className="search-result">
                                        <div className="result-header">  </div>
                                        <div className="result-body">
                                            <div className="table-responsive">
                                                <table className="table widget-26">
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <div className="widget-26-job-emp-img">
                                                                    <img src={`http://localhost:7400/images/${userPicturePath}`} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="widget-26-job-title">
                                                                    <h4 href="#"> {firstName + " " + lastName} </h4>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="widget-26-job-info">
                                                                    <p className="type m-0">user INFO</p>
                                                                    <p className="text-muted m-0">user INFO </p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="widget-26-job-salary">user INFO</div>
                                                            </td>
                                                            <td>
                                                                <div className="widget-26-job-category bg-soft-base">
                                                                    <i className="indicator bg-base" />
                                                                    <span>ay 7aga t5os al user</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <Button variant="contained" style={{ backgroundColor: 'purple' }}  /* onClick={} */  >Follow</Button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
