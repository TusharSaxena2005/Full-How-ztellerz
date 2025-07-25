import React, { useState, useEffect } from 'react'
import './BroadCast.css'
import Navbar from './Navbar'
import Loader from './Loader'


const BroadCast = () => {

    const [dataOfCurrentUser, setdataOfCurrentUser] = useState([]);
    const [dataOfClickedUser, setdataOfClickedUser] = useState([]);
    const [listOfBroadcastsUserInterestedIn, setlistOfBroadcastsUserInterestedIn] = useState([]);
    const [listOfUsersInterestedInBroadcasts, setlistOfUsersInterestedInBroadcasts] = useState([]);
    const [DataOfFetchItem, setDataOfFetchItem] = useState([]);
    const [DataOfClickedItem, setDataOfClickedItem] = useState([]);
      const [loading, setLoading] = useState(false);

    const checkPersonInterestedOrNot = (itemId) => {
        let flag = false;
        listOfBroadcastsUserInterestedIn.map((interestedItem) => {
            if (interestedItem.broadCast._id == itemId) {
                flag = true;
            }
        })

        return flag
    }

    const fetchCurrentUser = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://full-how-ztellerz.onrender.com/api/v1/user/current-user', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setdataOfCurrentUser(data.data);
                broadcastsUserInterestedIn(data.data._id);
            }
            setLoading(false);
        } catch (error) { }
    }

    const broadcastsUserInterestedIn = async (userId) => {
        setLoading(true);
        const response = await fetch(`https://full-how-ztellerz.onrender.com/api/v1/interested/interestedBroadcastsByUser/${userId}`, {
            method: 'GET',
            credentials: 'include'
        })
        if (response.ok) {
            const data = await response.json();
            setlistOfBroadcastsUserInterestedIn(data.data);
        }
        setLoading(false);
    }

    const getUserDetails = async (userId) => {
        setLoading(true);
        const response = await fetch(`https://full-how-ztellerz.onrender.com/api/v1/user/user-data/${userId}`, {
            method: 'GET',
            credentials: 'include'
        })
        if (response.ok) {
            const data = await response.json();
            setdataOfClickedUser(data.data);
        }
        setLoading(false);
    }

    const usersInterestedInBroadcast = async (broadcastId, e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`https://full-how-ztellerz.onrender.com/api/v1/interested/interestedPeople/${broadcastId}`, {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json();
            setlistOfUsersInterestedInBroadcasts(data.data);
            document.getElementById('outer-listOf-interested-pears').style.display = 'flex'
        }
        setLoading(false);
    }

    const handleDeleteItem = async (broadcastId, e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`https://full-how-ztellerz.onrender.com/api/v1/broadcast/delete-broadcast/${broadcastId}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            fetchItems();
        }
        setLoading(false);
    }

    const handleAddItem = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const allData = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('https://full-how-ztellerz.onrender.com/api/v1/broadcast/publish-broadcast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(allData),
                credentials: 'include'
            });
            if (response.ok) {
                document.getElementById('outer-add-broadcast').style.display = 'none';
                fetchItems();
            }
            setLoading(false);
        } catch (error) { }
    }

    const handleInterested = async (broadcastId, e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch(`https://full-how-ztellerz.onrender.com/api/v1/interested/toggle/${broadcastId}`, {
            method: 'POST',
            credentials: 'include'
        })
        if (response.ok) {
            if (e.target.textContent == 'Interested ?') {
                e.target.textContent = 'Not interested '
            }
            else {
                e.target.textContent = 'Interested ?'
            }
        }
        setLoading(false);
    }

    const fetchItemByCategory = async (category) => {
        setLoading(true);
        const response = await fetch(`https://full-how-ztellerz.onrender.com/api/v1/broadcast/filtered-broadcasts/${category}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setDataOfFetchItem(data.data);
            document.getElementById('mobile-aside1-open').style.display = 'none';
        }
        setLoading(false);
    }

    const onClickBorder = (e) => {
        document.getElementById('broadcast-aside2-ele1').style.display = 'flex'
        document.getElementById('profile-page').style.display = 'none'
        let options = document.getElementsByClassName('aside1-ele1-options-broadcast')
        document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
        for (let i = 0; i < options.length; i++) {
            options[i].style.border = 'none'
            options[i].style.backgroundColor = 'transparent'
        }
    }

    const fetchItems = async () => {
        setLoading(true);
        const response = await fetch('https://full-how-ztellerz.onrender.com/api/v1/broadcast/all-broadcasts',
            {
                method: 'GET',
                credentials: 'include'
            });
        if (response.ok) {
            const data = await response.json();
            setDataOfFetchItem(data.data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCurrentUser();
        fetchItems();
        document.getElementById('aside1-ele1-option1').style.border = '2px solid white'
        document.getElementById('aside1-ele1-option1').style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
    }, [])

    return (
        <>
            <Navbar />
            {loading && (
                <Loader />
            )}
            <div id='outer-broadcast'>
                <main id='inner-broadcast'>
                    <div id='mobile-aside1'>
                        <button id='open-menu' onClick={() => { document.getElementById('mobile-aside1-open').style.display = 'flex' }}>Category</button>
                        <button id="mobile-aside1-ele1-option7" onClick={() => {
                            document.getElementById('outer-add-broadcast').style.display = 'flex'
                        }}>
                            <img src="icons/plusIcon.svg" alt="" />
                            Add Item
                        </button>
                    </div>
                    <aside id='new-aside1' className='aside'>
                        <div id="aside1-ele1-outer-options">
                            <button id="aside1-ele1-option1" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                fetchItems();
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}>
                                <img src="icons/home.svg" alt="" /> Home</button>
                            <button id="aside1-ele1-option2" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                fetchItemByCategory('Sports');
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}>
                                <img src="icons/sports.svg" alt="" /> Sports</button>
                            <button id="aside1-ele1-option3" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                fetchItemByCategory('Club');
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}>
                                <img src="icons/club.svg" alt="" /> Club</button>
                            <button id="aside1-ele1-option4" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                fetchItemByCategory('Library');
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}>
                                <img src="icons/library.svg" alt="" /> Library</button>
                            <button id="aside1-ele1-option5" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                fetchItemByCategory('Gaming');
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}>
                                <img src="icons/gaming.svg" alt="" /> Gaming</button>
                            <button id="aside1-ele1-option6" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                e.preventDefault();
                                fetchItems();
                                let options = document.getElementsByClassName('aside1-ele1-options-broadcast')
                                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                                for (let i = 0; i < options.length; i++) {
                                    options[i].style.border = 'none'
                                    options[i].style.backgroundColor = 'transparent'
                                }
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                                document.getElementById('broadcast-aside2-ele1').style.display = 'none'
                                document.getElementById('profile-page').style.display = 'flex'
                            }}>
                                <img src="icons/profileIcon.svg" alt="" /> Profile</button>
                            <button id="aside1-ele1-option7" onClick={() => {
                                document.getElementById('outer-add-broadcast').style.display = 'flex'
                            }}>
                                <img src="icons/plusIcon.svg" alt="" />
                                Add Item</button>
                        </div>
                    </aside>
                    <div id='aside2-broadcast' className='aside'>
                        <div id="broadcast-aside2-ele1" className="broadcast-aside2-ele">
                            {
                                DataOfFetchItem.length > 0 ? (
                                    DataOfFetchItem.map((item) => {
                                        return (
                                            <ul key={item._id} className="broadcast-aside2-inner-ele1">
                                                <li className="sidebar2-ele">
                                                    <div className="writer">
                                                        <img src={item.owner[0].profilePic} alt="" />
                                                        <p onClick={() => {
                                                            setdataOfClickedUser(item.owner[0])
                                                            document.getElementById('outer-profile-broadcast').style.display = 'flex'
                                                        }}>{item.owner[0].name}</p>
                                                    </div>
                                                    <div className="title">
                                                        <p>{item.title}</p>
                                                    </div>
                                                    <div className="date">
                                                        <p>{item.date}</p>
                                                    </div>
                                                    <div className="all-details-btn">
                                                        <button className='details-btn' onClick={() => {
                                                            setDataOfClickedItem(item);
                                                            document.getElementById('outer-get-all-details').style.display = 'flex'
                                                        }
                                                        }>Get all details</button>
                                                        {
                                                            item.owner[0]._id != dataOfCurrentUser._id ? (
                                                                <div>
                                                                    {
                                                                        checkPersonInterestedOrNot(item._id) ? (
                                                                            <button className="interested" onClick={(e) => { handleInterested(item._id, e) }}>Not Interested</button>
                                                                        ) : (
                                                                            <button className="interested" onClick={(e) => { handleInterested(item._id, e) }}>Interested ?</button>
                                                                        )
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <button className="interested" onClick={(e) => { usersInterestedInBroadcast(item._id, e) }}>Interested list</button>
                                                                    <button className="delete-broadcast" onClick={(e) => { handleDeleteItem(item._id, e) }}>
                                                                        <img src="icons/delete.svg" alt="" />
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    })
                                ) : (
                                    <div id='no-items-found'>
                                        <h1>No broadcast found</h1>
                                    </div>
                                )
                            }
                        </div>
                        <div id="profile-page" className="broadcast-aside2-ele">
                            <ul id="profile-sideBar2" className="inner-sideBar2">
                                <div id="inner-profile-sideBar2-ele1" className="inner-profile-sideBar2-ele">
                                    <li id="mobile-inner-profile-pic" className="inner-profile">
                                        <img src={dataOfCurrentUser.profilePic} alt="profileIcon" />
                                    </li>
                                    <li id="inner-profile-username" className="inner-profile">
                                        <h2>@{dataOfCurrentUser.name}</h2>
                                        <p>
                                            <span>{dataOfCurrentUser.rollNo}</span> <span>{dataOfCurrentUser.hostelName}</span>
                                        </p>
                                    </li>
                                </div>
                                <div id="inner-profile-sideBar2-ele2" className="inner-profile-sideBar2-ele">
                                    <li id="posts-head">
                                        <h2>Posts</h2>
                                    </li>
                                    <li id="posts">
                                        <ul id="inner-posts">
                                            <div id="profile-item-outer-box">
                                                {
                                                    DataOfFetchItem.map((item) => {
                                                        return (
                                                            item.owner[0]._id == dataOfCurrentUser._id && (
                                                                <ul key={item._id} className="broadcast-aside2-inner-ele1">
                                                                    <li className="sidebar2-ele">
                                                                        <div className="title">
                                                                            <p>{item.title}</p>
                                                                        </div>
                                                                        <div className="date">
                                                                            <p>{item.date}</p>
                                                                        </div>
                                                                        <div className="all-details-btn">
                                                                            <button className='details-btn' onClick={() => {
                                                                                setDataOfClickedItem(item);
                                                                                document.getElementById('outer-get-all-details').style.display = 'flex'
                                                                            }
                                                                            }>Get all details</button>
                                                                            <div>
                                                                                <button className="interested" onClick={(e) => { usersInterestedInBroadcast(item._id, e) }}>Interested list</button>
                                                                                <button className="delete-broadcast" onClick={(e) => { handleDeleteItem(item._id, e) }}>
                                                                                    <img src="icons/delete.svg" alt="" />
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            ))
                                                    })}
                                            </div>
                                        </ul>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
            <main id='mobile-aside1-open'>
                <div id="mobile-aside1-ele1-outer-options">
                    <div id="inner-add-broadcast-ele1">
                        <button id='add-broadcast-cross-btn' onClick={() => {
                            document.getElementById('mobile-aside1-open').style.display = 'none'
                        }}>
                            <img src="icons/cross.svg" alt="" />
                        </button>
                    </div>
                    <button id="aside1-ele1-option1" className='aside1-ele1-options-broadcast' onClick={(e) => {
                        onClickBorder();
                        fetchItems();
                        e.target.style.border = '2px solid white'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                        document.getElementById('mobile-aside1-open').style.display = 'none'
                    }}>
                        <img src="icons/home.svg" alt="" /> Home</button>
                    <button id="aside1-ele1-option2" className='aside1-ele1-options-broadcast' onClick={(e) => {
                        onClickBorder();
                        fetchItemByCategory('Sports');
                        e.target.style.border = '2px solid white'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                    }}>
                        <img src="icons/sports.svg" alt="" /> Sports</button>
                    <button id="aside1-ele1-option3" className='aside1-ele1-options-broadcast' onClick={(e) => {
                        onClickBorder();
                        fetchItemByCategory('Club');
                        e.target.style.border = '2px solid white'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                    }}>
                        <img src="icons/club.svg" alt="" /> Club</button>
                    <button id="aside1-ele1-option4" className='aside1-ele1-options-broadcast' onClick={(e) => {
                        onClickBorder();
                        fetchItemByCategory('Library');
                        e.target.style.border = '2px solid white'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                    }}>
                        <img src="icons/library.svg" alt="" /> Library</button>
                    <button id="aside1-ele1-option5" className='aside1-ele1-options-broadcast' onClick={(e) => {
                        onClickBorder();
                        fetchItemByCategory('Gaming');
                        e.target.style.border = '2px solid white'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                    }}>
                        <img src="icons/gaming.svg" alt="" /> Gaming</button>
                    <button id="aside1-ele1-option6" className='aside1-ele1-options-broadcast' onClick={(e) => {
                        e.preventDefault();
                        fetchItems();
                        let options = document.getElementsByClassName('aside1-ele1-options-broadcast')
                        document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                        for (let i = 0; i < options.length; i++) {
                            options[i].style.border = 'none'
                            options[i].style.backgroundColor = 'transparent'
                        }
                        e.target.style.border = '2px solid white'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                        document.getElementById('broadcast-aside2-ele1').style.display = 'none'
                        document.getElementById('profile-page').style.display = 'flex'
                        document.getElementById('mobile-aside1-open').style.display = 'none'
                    }}>
                        <img src="icons/profileIcon.svg" alt="" /> Profile</button>
                </div>
            </main>
            <main id="outer-add-broadcast">
                <div id="inner-add-broadcast">
                    <div id="inner-add-broadcast-ele1">
                        <button id='add-broadcast-cross-btn' onClick={() => {
                            document.getElementById('outer-add-broadcast').style.display = 'none'
                        }}>
                            <img src="icons/cross.svg" alt="" />
                        </button>
                    </div>
                    <div id="inner-add-broadcast-ele2">
                        <form onSubmit={handleAddItem} encType='multipart/form-data'>
                            <input name='title' className='add-broadcast-form-inp' type="text" placeholder="Title" />
                            <div id='add-date-time'>
                                <input name='date' type="text" placeholder="dd/mm/yyyy" />
                                <input name='time' type="text" placeholder="Time (Ex. : 01:00 PM)" />
                            </div>
                            <input name='destination' className='add-broadcast-form-inp' type="text" placeholder="Destination" />
                            <select className='add-broadcast-form-inp' name="category" required>
                                <option name="category" value="">Category</option>
                                <option name="category" value="Sports">Sports</option>
                                <option name="category" value="Library">Library</option>
                                <option name="category" value="Club">Club</option>
                                <option name="category" value="Gaming">Gaming</option>
                                <option name="category" value="Other">Other</option>
                            </select>
                            <div id='textarea' className='add-broadcast-form-inp'>
                                <textarea name='description' placeholder="Description of your broadcast..."></textarea>
                            </div>
                            <button id='add-broadcast-btn' type='submit'>Post</button>
                        </form>
                    </div>
                </div>
            </main>
            <main id='outer-listOf-interested-pears'>
                <div id='inner-listOf-interested-pears'>
                    <ul id="cross-listOf-interested-pears">
                        <button id='close-list' onClick={() => {
                            document.getElementById('outer-listOf-interested-pears').style.display = 'none'
                        }}>
                            <img src="icons/cross.svg" alt="close" />
                        </button>
                    </ul>
                    <ul id="listOf-interested-pears">
                        {
                            listOfUsersInterestedInBroadcasts.map((user) => {
                                return (
                                    <li key={user.interestedBy._id} className='people-whoAre-interested'>
                                        <button onClick={() => {
                                            getUserDetails(user.interestedBy._id);
                                            document.getElementById('outer-profile-broadcast').style.display = 'flex';
                                        }}>
                                            <img src={user.interestedBy.profilePic} alt="" />
                                            <p>{user.interestedBy.name}</p>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </main >
            <main id='outer-get-all-details'>
                <div id='inner-get-all-details'>
                    <ul id="get-all-details-cross" onClick={() => { document.getElementById('outer-get-all-details').style.display = 'none' }}>
                        <button>
                            <img src="icons/cross.svg" alt="close" />
                        </button>
                    </ul>
                    <ul id="get-all-details">
                        <li id="get-all-details-title">{DataOfClickedItem.title}</li>
                        <li id="get-all-details-description">{DataOfClickedItem.description}</li>
                        <li id="get-all-details-destination">Destination : <span> {DataOfClickedItem.destination}</span></li>
                        <li id="get-all-details-category">Category : <span> {DataOfClickedItem.category}</span></li>
                        <li id="get-all-details-date">Date : <span> {DataOfClickedItem.date}</span></li>
                        <li id="get-all-details-time">Time : <span> {DataOfClickedItem.time}</span></li>
                    </ul>
                </div>
            </main>
            <main id='outer-profile-broadcast'>
                <div id="others-profile">
                    <div id="others-profile1">
                        <button id='close-profile-broadcast' onClick={() => { document.getElementById('outer-profile-broadcast').style.display = 'none' }}>
                            <img src="icons/cross.svg" alt="" />
                        </button>
                    </div>
                    <ul id="others-profile2">
                        <li id="others-profile-pic">
                            <img src={dataOfClickedUser.profilePic} alt="profilePic" />
                        </li>
                        <li id="others-profile-username">
                            <h2>Name : {dataOfClickedUser.name}</h2>
                            <p>Gender : {dataOfClickedUser.gender}</p>
                            <p>Roll no. : {dataOfClickedUser.rollNo}</p>
                            <p>Phone no. : {dataOfClickedUser.phoneNo}</p>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default BroadCast
