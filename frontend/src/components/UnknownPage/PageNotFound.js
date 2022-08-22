import './PageNotFound.css'
import {NavLink} from 'react-router-dom'
import Whomp from '../../images/Whomp.webp'

export function PageNotFound() {

        return (
            <div className='errorPage'>
            <h1>Whomp Whomp!</h1>
            <div className='Whomps'>
             <img className='whomp1' src={Whomp} alt='Whomp1'/>
             <img className='whomp2' src={Whomp} alt='Whomp2'/>
            </div>
            <div className='headers'>
             <h2>Looks like you hit a page that doesn't exist</h2>
                <div className='linkerror'>
             <NavLink to="/">Click here to go home</NavLink>
                </div>
            </div>
        </div>
        )
}
