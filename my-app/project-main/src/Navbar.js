import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='position'>
      <nav class="navbar navbar-expand-lg bg-info ">
  <div class="container-fluid">
  <Link to='/' className='navbar-brand'>Navbar</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link to='/home' className='nav-link' >Home</Link>
        </li>
        <li class="nav-item">
          <Link to='/card' className='nav-link' >Card</Link>
        </li>
        <li class="nav-item">
          <Link to='/tab' className='nav-link' >Table</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Extra
          </a>
          <ul class="dropdown-menu">
            <li><Link class="dropdown-item" to='/EvenOdd'>useState</Link></li>
            <li><Link class="dropdown-item" to='/api'>useEffect</Link></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
      </ul> 
    </div>
    <Link to="/form">
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
       <button class="btn btn-primary me-md-2" type="button">Sign up</button>
    </div>
    </Link>
  </div>
</nav>
    </div>
  )
}

export default Navbar
