import React from 'react';
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

import CommunitySearch from '../../10Community/components/communitySearch';
import Search from '../../11Search/Search';
import { useParams } from "react-router-dom";




// const UserCommunitySearch = (searchText) => {
const UserCommunitySearch = () => {
    //no need now
    var searchDiv
    const [searchText] = useOutletContext();

    // let { searchtext } = useParams();
    // const [searchText, setSearchText] = useState(searchtext);

    const [communitySearchResult, setCommunitySearchResult] = useState([])
    const [userSearchResults, setUserSearchResults] = useState([])
    //searchDiv is a flag
    const [SearchDiv, setSearchDiv] = useState();

    //get all comunitiy by search name and set it to community State
    const getSearchCommunities = () => {
        let searchWord = searchText;
        axios.get(`${process.env.REACT_APP_API_URL}/communities/searchbyname`,
            { params: { communityName: searchText } }
        ).then((res) => {

            console.log("🚀 ~ file: usersCommunitySearch.jsx:33 ~ res.data:", res.data)
            setCommunitySearchResult(res.data);
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    const searchCommunity = () => {
        getSearchCommunities();
        // var searchDiv =
        //     communitySearchResult?.map((c) => (
        //         <CommunitySearch comm={c} />
        //     ));

        // setSearchDiv(searchDiv)
    }


    const getSearchUsers = (data) => {
        if (!data) return;
        // setSearch(data);
        // setFlag(false);
        console.log("************");
        console.log(data);
        try {
            const searchQuery = data.split(" ");
            axios.post(`${process.env.REACT_APP_API_URL}/search`, { firstName: searchQuery[0], lastName: searchQuery[1] },
                { withCredentials: true }
            )
                // .then((response) => {
                //     return response;
                // })
                .then(({ data }) => {
                    console.log(data);
                    setUserSearchResults(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch { }
    };

    const searchUser = () => {
        getSearchUsers(searchText);
        // searchDiv = userSearchResults?.map((c) => (
        //     <Search key={c._id} user={c} firstName={c.firstName} lastName={c.lastName} userPicturePath={c.profilePicture} />
        // ))
        // setSearchDiv(searchDiv)


    }

    useEffect(() => {
        setSearchDiv(
            communitySearchResult?.map((c) => <CommunitySearch key={c._id} comm={c} />)
        );
    }, [communitySearchResult]);

    useEffect(() => {
        setSearchDiv(
            userSearchResults?.map((c) => (
                <Search key={c._id} user={c} firstName={c.firstName} lastName={c.lastName} userPicturePath={c.profilePicture} />
            ))
        );
    }, [userSearchResults]);

    useEffect(() => { console.log(searchText) }, [])

    return (
        <div>
            <div className="SearchNav">
                <input className="buttonSearch" type="button" value="Found Users" onClick={() => { searchUser() }} />
                {/* /* <input className="buttonSearch" type="button" value="Posts" /> */}
                <input className="buttonSearch" type="button" value="Communities" onClick={searchCommunity} />
            </div>


            <div>
                {SearchDiv}
            </div>

        </div>
    );
};

export default UserCommunitySearch;