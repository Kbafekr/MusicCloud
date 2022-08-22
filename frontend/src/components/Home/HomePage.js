import './HomePage.css'
import { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { ImagesArray } from './Carousel-Images/Images'

export function HomePage() {
    const UserSignedIn = useSelector(state => state.session.user)


    const [imageNumber, setImageNumber] = useState(0)

    //prevents counter from updating after every single render
    useEffect(() => {
        if (imageNumber < ImagesArray.length) {
           const ImageTransition =  setInterval(() => {
            //check to see if previous number is greater than images array length, if not then
                setImageNumber((previousImageNumber) => (previousImageNumber + 1) % ImagesArray.length)
            }, 2000)
            return () => clearInterval(ImageTransition)
        }
        else {
            setImageNumber(0)
        }
    }, [])

    if (UserSignedIn) {
        return (
            <h1>Welcome back!</h1>
        )
    }
    else {
        return (
            <div className='CarouselImages'>
        <img className='images' src={ImagesArray[imageNumber].image}/>
            </div>

        )
    }
}
