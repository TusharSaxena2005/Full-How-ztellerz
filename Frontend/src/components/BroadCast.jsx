import React from 'react'
import './BroadCast.css'
import Navbar from './Navbar'


const BroadCast = () => {

    const onClickBorder = (e) => {
        // document.getElementById('profile-page').style.display = 'none'
        // document.getElementById('item-outer-box').style.display = 'flex'
        let options = document.getElementsByClassName('aside1-ele1-options-broadcast')
        document.getElementById('aside1-ele1-option7').style.backgroundColor = 'aliceblue'
        for (let i = 0; i < options.length; i++) {
            options[i].style.border = 'none'
            options[i].style.backgroundColor = 'transparent'
        }
    }
    return (
        <>
            <Navbar />
            <div id='outer-broadcast'>
                <main id='inner-broadcast'>
                    <aside id='aside1' className='aside'>
                        <div id="aside1-ele1-outer-options">
                            <button id="aside1-ele1-option1" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}> 
                            <img src="icons/home.svg" alt="" /> Home</button>
                            <button id="aside1-ele1-option2" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}> 
                            <img src="icons/sports.svg" alt="" /> Sports</button>
                            <button id="aside1-ele1-option3" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}> 
                            <img src="icons/club.svg" alt="" /> Club</button>
                            <button id="aside1-ele1-option4" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
                                e.target.style.border = '2px solid white'
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)'
                            }}> 
                            <img src="icons/library.svg" alt="" /> Library</button>
                            <button id="aside1-ele1-option5" className='aside1-ele1-options-broadcast' onClick={(e) => {
                                onClickBorder();
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
                                document.getElementById('item-outer-box').style.display = 'none'
                                document.getElementById('profile-page').style.display = 'flex'
                            }}> 
                            <img src="icons/profileIcon.svg" alt="" /> Profile</button>
                            <button id="aside1-ele1-option7">
                            <img src="icons/plusIcon.svg" alt="" />
                            Add Item</button>
                        </div>
                    </aside>
                    <div id='aside2-broadcast' className='aside'>
                    </div>
                </main>
            </div>
        </>
    )
}

export default BroadCast
