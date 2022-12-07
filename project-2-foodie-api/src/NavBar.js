import { Link } from 'react-router-dom';

function NavBar () {
    // const icon = document.getElementById('icon');
    // const navLinks = document.getElementById('nav-links');
    // icon.addEventListener('click', () => {
    //     if (navLinks.style.display === 'block') {
    //         navLinks.style.display = 'none';
    //     } else {
    //         navLinks.style.display = 'block';
    //     }
    // });

    return (
        <>
        <div className="navbar">
            <div className="logo">
                <Link to="/">foodie</Link></div>
            <div className="nav-search-container">
                <div className="nav-search">
                    <div className="nav-search-input">
                        <input type="text" placeholder="search ..." /> 
                    <a href="#" className="icon" id="icon"><i className="fa fa-bars"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div className="nav-links" id="nav-links">
            <a href="#">Home</a>
            <a href="#">Restaurants</a>
            <a href="#">Link</a>
            <a href="#">Link</a>
        </div>
        </>
    )
}

export default NavBar;