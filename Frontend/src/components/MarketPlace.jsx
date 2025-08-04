import React, { useEffect, useState } from 'react'
import './MarketPlace.css'
import Loader from './Loader'


const MarketPlace = () => {

  const [dataOfFetchItem, setDataOfFetchItem] = useState([]);
  const [detailOfFetchedItem, setDetailOfFetchedItem] = useState([]);
  const [detailOfOwnerOfFetchedItem, setdetailOfOwnerOfFetchedItem] = useState([]);
  const [dataOfCurrentUser, setdataOfCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);



  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.howzellerz.store/api/v1/user/current-user', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setdataOfCurrentUser(data.data);
      }
      setLoading(false);
    } catch (error) { }
  }

  const deleteItem = async (itemId) => {
    setLoading(true);
    const response = await fetch(`https://api.howzellerz.store/api/v1/marketplace/delete-item/${itemId}`, {
      method: 'GET',
      credentials: 'include'
    })

    if (response.ok) {
      fetchItems();
    }
    setLoading(false);
  }

  const detailOfItem = async (itemId) => {
    setLoading(true);
    const response = await fetch(`https://api.howzellerz.store/api/v1/marketplace/item-by-id/${itemId}`, {
      method: 'GET',
      credentials: 'include'
    })

    if (response.ok) {
      const data = await response.json();
      setDetailOfFetchedItem(data.data[0]);
      setdetailOfOwnerOfFetchedItem(data.data[0].owner[0]);
      document.getElementById('outer-details-of-item').style.display = 'flex';
    }
    setLoading(false);
  }

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      setLoading(true);
      const response = await fetch('https://api.howzellerz.store/api/v1/marketplace/add-item', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      if (response.ok) {
        document.getElementById('most-outer-add-item').style.display = 'none';
        fetchItems();
      }
      setLoading(false);
    } catch (error) { }
  }

  const fetchItemsByCategory = async (category) => {
    setLoading(true);
    const response = await fetch(`https://api.howzellerz.store/api/v1/marketplace/filtered-item/${category}`,
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

  const fetchItemsByHostel = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    let allData = Object.fromEntries(formData.entries());

    const response = await fetch(`https://api.howzellerz.store/api/v1/marketplace/filtered-byHostelName-item?hostelName=${allData.hostelName}&floorNo=${allData.floorNo}`, {
      method: 'GET',
      credentials: 'include'
    })
    if (response.ok) {
      const data = await response.json();
      setDataOfFetchItem(data.data);
      document.getElementById('filterHostelName').value = '';
      document.getElementById('filterFloorNum').value = '';
    }
    setLoading(false);
  }

  const fetchItems = async () => {
    setLoading(true);
    const response = await fetch('https://api.howzellerz.store/api/v1/marketplace/get-all-item',
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
    document.getElementsByClassName('aside1-ele1-options')[0].style.border = '2px solid white'
    document.getElementsByClassName('aside1-ele1-options')[0].style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
    fetchItems();
    fetchCurrentUser();
  }, [])



  return (
    <>
      {loading && (
        <Loader />
      )}
      <div id='outer-marketplace'>
        <main id='inner-marketplace'>
          <aside id='aside1' className='aside'>
            <div id="aside1-ele1-outer-options">
              <button id="aside1-ele1-option1" className='aside1-ele1-options' onClick={(e) => {
                document.getElementById('profile-page').style.display = 'none'
                document.getElementById('item-outer-box').style.display = 'flex'
                let options = document.getElementsByClassName('aside1-ele1-options')
                fetchItems();
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
              }}>Home</button>
              <button id="aside1-ele1-option2" className='aside1-ele1-options' onClick={(e) => {
                document.getElementById('profile-page').style.display = 'none'
                document.getElementById('item-outer-box').style.display = 'flex'
                fetchItemsByCategory('chips');
                let options = document.getElementsByClassName('aside1-ele1-options')
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
              }}>Chips</button>
              <button id="aside1-ele1-option3" className='aside1-ele1-options' onClick={(e) => {
                document.getElementById('profile-page').style.display = 'none'
                document.getElementById('item-outer-box').style.display = 'flex'
                fetchItemsByCategory('drinks');
                let options = document.getElementsByClassName('aside1-ele1-options')
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
              }}>Drinks</button>
              <button id="aside1-ele1-option4" className='aside1-ele1-options' onClick={(e) => {
                document.getElementById('item-outer-box').style.display = 'flex'
                document.getElementById('profile-page').style.display = 'none'
                fetchItemsByCategory('chocolates');
                let options = document.getElementsByClassName('aside1-ele1-options')
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
              }}>Chocolates</button>
              <button id="aside1-ele1-option5" className='aside1-ele1-options' onClick={(e) => {
                document.getElementById('item-outer-box').style.display = 'flex'
                document.getElementById('profile-page').style.display = 'none'
                fetchItemsByCategory('other');
                let options = document.getElementsByClassName('aside1-ele1-options')
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
              }}>Other</button>
              <button id="aside1-ele1-option6" className='aside1-ele1-options' onClick={(e) => {
                e.preventDefault();
                let options = document.getElementsByClassName('aside1-ele1-options')
                fetchItems();
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                document.getElementById('item-outer-box').style.display = 'none'
                document.getElementById('profile-page').style.display = 'flex'
              }}>Profile</button>
              <button id="aside1-ele1-option7" onClick={() => {
                document.getElementById('most-outer-add-item').style.display = 'flex'
                document.getElementById('itemName').value = '';
                document.getElementById('itemCategory').value = '';
                document.getElementById('itemImage').value = '';
              }}>
                <img src="icons/plusIcon.svg" alt="" />
                Add Item</button>
            </div>
          </aside>
          <div id='aside2' className='aside'>
            <div id="inner-aside2-ele1" className="inner-aside2-ele">
              <div id="inner-aside2-ele1-filter">
                <form onSubmit={fetchItemsByHostel} encType='multipart/form-data'>
                  <select name="hostelName" id="filterHostelName">
                    <option value="">Choose hostel</option>
                    <option value="Archimedes A">Archimedes A</option>
                    <option value="Archimedes B">Archimedes B</option>
                    <option value="Armstrong">Armstrong</option>
                    <option value="Aristotle">Aristotle</option>
                    <option value="Columbus">Columbus</option>
                    <option value="Franklin A">Franklin A</option>
                    <option value="Franklin B">Franklin B</option>
                    <option value="IBN">IBN</option>
                    <option value="Marcopolo">Marcopolo</option>
                    <option value="Megalan">Megalan</option>
                    <option value="Nightingale">Nightingale</option>
                    <option value="Pie">Pie</option>
                    <option value="Vasco">Vasco</option>
                  </select>
                  <select name="floorNo" id="filterFloorNum">
                    <option value="">Choose floor</option>
                    <option value="1">Floor 1</option>
                    <option value="2">Floor 2</option>
                    <option value="3">Floor 3</option>
                    <option value="4">Floor 4</option>
                    <option value="5">Floor 5</option>
                    <option value="6">Floor 6</option>
                    <option value="7">Floor 7</option>
                    <option value="8">Floor 8</option>
                    <option value="9">Floor 9</option>
                  </select>
                  <button type="submit" id="filterApply">Apply</button>
                </form>
              </div>
              <button id='filter-open-btn' onClick={() => { document.getElementById('filter-outer-section').style.display = 'flex' }}>Filter</button>
            </div>
            <div id="inner-aside2-ele2" className="inner-aside2-ele">
              <div id="item-outer-box">
                {
                  dataOfFetchItem.length > 0 ? (
                    dataOfFetchItem.map((item) => {
                      return (
                        <div key={item._id} className="outer-foodItems">
                          <div className="product-image">
                            <img src={item.itemImage} alt={item.itemName} />
                          </div>
                          <p>{item.itemName}</p>
                          <div className='outer-details-btn'>
                            <button className='detail-btn' onClick={() => { detailOfItem(item._id) }}>Details</button>
                            {
                              dataOfCurrentUser.rollNo == item.owner[0].rollNo && (
                                <button className='delete-item-btn'>
                                  <img src="icons/delete.svg" alt="delete" onClick={() => { deleteItem(item._id) }} />
                                </button>
                              )
                            }
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div id='no-items-found'>
                      <h1>No items found</h1>
                    </div>
                  )
                }
              </div>
              <div id='profile-page'>
                <ul id="profile-sideBar2" className="inner-sideBar2">
                  <div id="inner-profile-sideBar2-ele1" className="inner-profile-sideBar2-ele">
                    <li id="inner-profile-pic" className="inner-profile">
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
                        <li id="profile-item-outer-box">
                          {
                            dataOfFetchItem.length > 0 ? (
                              dataOfFetchItem.map((item) => {
                                return (
                                  <div key={item._id}>
                                    {
                                      dataOfCurrentUser.rollNo == item.owner[0].rollNo && (<div className="profile-outer-foodItems">
                                        <div className="product-image">
                                          <img src={item.itemImage} alt={item.itemName} />
                                        </div>
                                        <p>{item.itemName}</p>
                                        <div className='profile-outer-details-btn'>
                                          <button className='detail-btn' onClick={() => { detailOfItem(item._id) }}>Details</button>
                                          <button className='delete-item-btn'>
                                            <img src="icons/delete.svg" alt="delete" onClick={() => { deleteItem(item._id) }} />
                                          </button>
                                        </div>
                                      </div>)
                                    }
                                  </div>
                                )
                              })

                            ) : (
                              <div id='no-items-found'>
                                <h1>No items found</h1>
                              </div>
                            )
                          }
                        </li>
                      </ul>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </main >
      </div >

      <main id='most-outer-add-item'>
        <div id='outer-add-item'>
          <div id="add-item-cross-btn">
            <button onClick={() => {
              document.getElementById('most-outer-add-item').style.display = 'none'

            }}>
              <img src="icons/cross.svg" alt="" />
            </button>
          </div>
          <form onSubmit={handleAddItem} encType='multipart/form-data' id='add-item-form'>
            <input type="text" id="itemName" name="itemName" placeholder="Enter product name" />
            <select name="itemCategory" id="itemCategory">
              <option value="">Product category</option>
              <option value="chips">Chips</option>
              <option value="drinks">Drinks</option>
              <option value="biscuits">Chocolates</option>
              <option value="other">Other</option>
            </select>
            <div id='add-item-image'>
              <label htmlFor="itemImage">Product image :</label>
              <input type="file" id="itemImage" name="itemImage" />
            </div>
            <button type='submit'>Add Item</button>
          </form>
        </div>
      </main>
      <main id='filter-outer-section'>
        <div id='outer-add-item'>
          <div id="add-item-cross-btn">
            <button onClick={() => { document.getElementById('filter-outer-section').style.display = 'none' }}>
              <img src="icons/cross.svg" alt="" />
            </button>
          </div>
          <form onSubmit={fetchItemsByHostel} encType='multipart/form-data'>
            <h1>Filter</h1>
            <select name="hostelName" id="filterHostelName">
              <option value="">Choose hostel</option>
              <option value="Archimedes A">Archimedes A</option>
              <option value="Archimedes B">Archimedes B</option>
              <option value="Armstrong">Armstrong</option>
              <option value="Aristotle">Aristotle</option>
              <option value="Columbus">Columbus</option>
              <option value="Franklin A">Franklin A</option>
              <option value="Franklin B">Franklin B</option>
              <option value="IBN">IBN</option>
              <option value="Marcopolo">Marcopolo</option>
              <option value="Megalan">Megalan</option>
              <option value="Nightingale">Nightingale</option>
              <option value="Pie">Pie</option>
              <option value="Vasco">Vasco</option>
            </select>
            <select name="floorNo" id="filterFloorNum">
              <option value="">Choose floor</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
              <option value="4">Floor 4</option>
              <option value="5">Floor 5</option>
              <option value="6">Floor 6</option>
              <option value="7">Floor 7</option>
              <option value="8">Floor 8</option>
              <option value="9">Floor 9</option>
            </select>
            <button type="submit" id="filterApply" onClick={() => {
              document.getElementById('filter-outer-section').style.display = 'none'
            }}>Apply</button>
          </form>
        </div>
      </main>
      <main id='outer-details-of-item'>
        <div id='inner-details-of-item'>
          <div id="detail-cross-btn">
            <button onClick={() => { document.getElementById('outer-details-of-item').style.display = 'none' }}>
              <img src="icons/cross.svg" alt="" />
            </button>
          </div>
          <div id="most-inner-details-of-item">
            <div id="inner-details-of-item1">
              <img src={detailOfFetchedItem.itemImage} alt="" />
            </div>
            <ul id="inner-details-of-item2">
              <li id="detail-box2-ele1" className="detail-box2-ele">
                <h2>Product details :-</h2>
                <p id="productName">{detailOfFetchedItem.itemName}</p>
              </li>
              <li id="detail-box2-ele2" className="detail-box2-ele">
                <h2>Seller details :-</h2>
                <p>Name : <span>{detailOfOwnerOfFetchedItem.name}</span> </p>
                <p>Contact no. : <span>{detailOfOwnerOfFetchedItem.phoneNo}</span> </p>
                <p>Hostel Name : <span>{detailOfOwnerOfFetchedItem.hostelName}</span></p>
                <p>Floor : <span>{detailOfOwnerOfFetchedItem.floorNo}</span> </p>
                <p>Room no. : <span>{detailOfOwnerOfFetchedItem.roomNo}</span> </p>
              </li>
            </ul>
          </div>
        </div>
      </main>

    </>
  )
}

export default MarketPlace
