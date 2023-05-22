import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../../Components/NavBar';
import './Search.css';
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext";
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next'



const Search = ({ firstName, lastName, userPicturePath, user }) => {
    let [t, i18n] = useTranslation();

    return (
        <div className="card card-margin">
            <div className="card-body">
                <div className="col-lg-12">
                    <table className="table widget-26">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="widget-26-job-emp-img">
                                        <NavLink to={`/profile`} state={{ user: user }}>
                                            <img src={`${process.env.REACT_APP_API_URL}/images/${userPicturePath}`} />
                                        </NavLink>
                                    </div>
                                </td>
                                <td>
                                    <div className="widget-26-job-title">
                                        <h5 href="#"> {firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1)} </h5>
                                    </div>
                                </td>
                                <td>
                                    {user.career ?
                                        <div className="widget-26-job-category bg-soft-base">
                                            <span>{user.career}</span>
                                        </div> :
                                        <div>
                                            <div>
                                                <p className=" m-0">{t("Title")}</p>
                                            </div>
                                            <div className="widget-26-job-category bg-soft-base">
                                                <span>{t("Not Mentioned")}</span>
                                            </div>
                                        </div>
                                    }
                                </td>
                                <td>
                                    {user.city ?
                                        <div className="widget-26-job-info">
                                            <p className="type m-0">{t("Location")}</p>
                                            <p className="text-muted m-0">{user.city}</p>
                                        </div> :
                                        <div className="widget-26-job-info">
                                            <p className="type m-0">{t("Location")}</p>
                                            <p className="text-muted m-0">{t("Not Mentioned")}</p>
                                        </div>
                                    }
                                </td>
                                <td>
                                    <NavLink to={`/profile`} state={{ user: user }} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" style={{ backgroundColor: 'purple' }} size='small' >{t("View Profile")}</Button>
                                    </NavLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Search;
