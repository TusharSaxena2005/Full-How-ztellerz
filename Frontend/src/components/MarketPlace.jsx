import React, { useEffect, useState } from 'react'
import './MarketPlace.css'
import Navbar from './Navbar'


const MarketPlace = () => {

  const [dataOfFetchItem, setDataOfFetchItem] = useState([]);
  const [dataOfCurrentUser, setdataOfCurrentUser] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/user/current-user', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setdataOfCurrentUser(data.data);
      }
    } catch (error) { }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch('http://localhost:8000/api/v1/marketplace/add-item', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      if (response.ok) {
        document.getElementById('most-outer-add-item').style.display = 'none';
        fetchItems();
      }
    } catch (error) { }
  }

  const fetchItems = async () => {
    const response = await fetch('http://localhost:8000/api/v1/marketplace/get-all-item',
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
    fetchItems();
    fetchCurrentUser();
  }, [])



  return (
    <>
      <Navbar />
      <div id='outer-marketplace'>
        <main id='inner-marketplace'>
          <aside id='aside1' className='aside'>
            <div id="aside1-ele1-outer-options">
              <button id="aside1-ele1-option1" className='aside1-ele1-options' onClick={(e) => {
                let options = document.getElementsByClassName('aside1-ele1-options')
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
              }}>Home</button>
              <button id="aside1-ele1-option2" className='aside1-ele1-options' onClick={(e) => {
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
                let options = document.getElementsByClassName('aside1-ele1-options')
                document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
                for (let i = 0; i < options.length; i++) {
                  options[i].style.border = 'none'
                  options[i].style.backgroundColor = 'transparent'
                }
                e.target.style.border = '2px solid white'
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
              }}>Profile</button>
              <button id="aside1-ele1-option7" onClick={() => {
                document.getElementById('most-outer-add-item').style.display = 'flex'
                document.getElementById('itemName').value = '';
                document.getElementById('itemPrice').value = '';
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
                <form>
                  <select name="hostel" id="filterHostelName">
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
                  <select name="floor" id="filterFloorNum">
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
            </div>
            <div id="inner-aside2-ele2" className="inner-aside2-ele">
              <div id="item-outer-box">
                {
                  dataOfFetchItem.map((item) => {
                    return (
                      <div key={item._id} className="outer-foodItems" data-name={item.itemName} data-price={item.itemPrice} data-category={item.itemCategory} data-image={item.itemImage} data-sname={item.owner[0].name} data-sphoneno={item.owner[0].phoneNo} data-shostelname={item.owner[0].hostelName} data-sfloor={item.owner[0].floorNo} data-sroom={item.owner[0].roomNo}>
                        <div className="product-image">
                          <img src={item.itemImage} alt={item.itemName} />
                        </div>
                        <p>{item.itemName}</p>
                        <p>{item.itemPrice} Rs.</p>
                        <div className='outer-details-btn'>
                          <button className='detail-btn'>Details</button>
                          {
                            dataOfCurrentUser.rollNo == item.owner[0].rollNo && (
                              <button className='delete-item-btn'>
                                <img src="icons/delete.svg" alt="delete" />
                              </button>
                            )
                          }
                        </div>
                      </div>
                    )
                  })
                }
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
            <input type="number" id="itemPrice" name="itemPrice" placeholder="Enter product price" />
            <select name="itemCategory">
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

    </>
  )
}

export default MarketPlace
