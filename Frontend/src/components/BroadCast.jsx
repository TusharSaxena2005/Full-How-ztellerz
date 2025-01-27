import React, { useState, useEffect } from 'react'
import './BroadCast.css'
import Navbar from './Navbar'


const BroadCast = () => {

    const [dataOfCurrentUser, setdataOfCurrentUser] = useState([]);
    const [listOfBroadcastsUserInterestedIn, setlistOfBroadcastsUserInterestedIn] = useState([]);
    const [listOfUsersInterestedInBroadcasts, setlistOfUsersInterestedInBroadcasts] = useState([]);
    const [DataOfFetchItem, setDataOfFetchItem] = useState([]);
    const [DataOfClickedItem, setDataOfClickedItem] = useState([]);

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
            const response = await fetch('http://localhost:8000/api/v1/user/current-user', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setdataOfCurrentUser(data.data);
                broadcastsUserInterestedIn(data.data._id);
            }
        } catch (error) { }
    }

    const broadcastsUserInterestedIn = async (userId) => {
        const response = await fetch(`http://localhost:8000/api/v1/interested/interestedBroadcastsByUser/${userId}`, {
            method: 'GET',
            credentials: 'include'
        })
        if (response.ok) {
            const data = await response.json();
            setlistOfBroadcastsUserInterestedIn(data.data);
        }
    }

    const usersInterestedInBroadcast = async (broadcastId, e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/v1/interested/interestedPeople/${broadcastId}`, {
            method: 'GET',
            credentials: 'include'
        })

        if (response.ok) {
            const data = await response.json();
            setlistOfUsersInterestedInBroadcasts(data.data);
            document.getElementById('outer-listOf-interested-pears').style.display = 'flex'
        }
    }

    const handleDeleteItem = async (broadcastId, e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/v1/broadcast/delete-broadcast/${broadcastId}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            fetchItems();
        }
    }

    const handleAddItem = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const allData = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('http://localhost:8000/api/v1/broadcast/publish-broadcast', {
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
        } catch (error) { }
    }

    const handleInterested = async (broadcastId, e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8000/api/v1/interested/toggle/${broadcastId}`, {
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
    }

    const fetchItemByCategory = async (category) => {
        const response = await fetch(`http://localhost:8000/api/v1/broadcast/filtered-broadcasts/${category}`, {
            method: 'GET',
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setDataOfFetchItem(data.data);
        }
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
        const response = await fetch('http://localhost:8000/api/v1/broadcast/all-broadcasts',
            {
                method: 'GET',
                credentials: 'include'
            });
        if (response.ok) {
            const data = await response.json();
            setDataOfFetchItem(data.data);
        }
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
            <div id='outer-broadcast'>
                <main id='inner-broadcast'>
                    <aside id='aside1' className='aside'>
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
                                DataOfFetchItem.map((item) => {
                                    return (
                                        <ul key={item._id} className="broadcast-aside2-inner-ele1">
                                            <li className="sidebar2-ele">
                                                <div className="writer">
                                                    <img src={item.owner[0].profilePic} alt="" />
                                                    <p>{item.owner[0].name}</p>
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
                                })}
                        </div>
                        <div id="profile-page" className="broadcast-aside2-ele"></div>
                    </div>
                </main>
            </div>
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
                                <textarea name='description' placeholder="Description"></textarea>
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
                                        <button>
                                            <img src={user.interestedBy.profilePic} alt="" />
                                            <p>{user.interestedBy.name}</p>
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </main>
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
        </>
    )
}

export default BroadCast
