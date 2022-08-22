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
            <div className='homePage'>
            <h1>Welcome back!</h1>
            <div className='CarouselImages'>
             <img className='images' src={ImagesArray[imageNumber].image}/>
            </div>

            <div className='headers'>
             <h1>Insert search bar for tracks and artists & signin button that redirects to songs page</h1>

             <h1>Here's whats trending in the MusicCloud Community</h1>
             <h2>add 'explore trending playlists' button</h2>

             <h1>Thanks for listening. Now join in!</h1>
             <h2>Save tracks, follow artists and build playlists. All for free.</h2>

             <h3> create account button</h3>
             <h4>already have an account? + sign in button</h4>

             <h5>footer (include github link, modal for language selection, other bs)</h5>
            </div>
        </div>
        )
    }
    else {
        return (
            <div className='homePage'>
                <div className='CarouselImages'>
                 <img className='images' src={ImagesArray[imageNumber].image}/>
                </div>

                <div className='headers'>
                 <h1>Insert search bar for tracks and artists & signin button that redirects to songs page</h1>

                 <h1>Here's whats trending in the MusicCloud Community</h1>
                 <h2>add 'explore trending playlists' button</h2>

                 <h1>Thanks for listening. Now join in!</h1>
                 <h2>Save tracks, follow artists and build playlists. All for free.</h2>

                 <h3> create account button</h3>
                 <h4>already have an account? + sign in button</h4>

                 <h5>footer (include github link, modal for language selection, other bs)</h5>
                </div>
            </div>

        )
    }
}
