import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Cookies from 'js-cookie'
import HeaderLogo from '../../assets/HeaderLogo.jpg'
// import { logout } from '../../redux/actions/authActions'
import './index.css'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onclickLogout = () => {
    Cookies.remove('jwtToken')
    // dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <AppBar position='static' sx={{ backgroundColor: '#f8fafc' }}>
      <Toolbar sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1440px',
            height: '96px',
            margin: 'auto',
          }}
        >
          {/* <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <MenuIcon />
          </IconButton> */}
          <img
            src={HeaderLogo}
            alt='HeaderLogo'
            className='header-logo'
            style={{ marginRight: '10px', width: '53px', height: '43px' }}
          />
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              color: '#f7931e',
              fontSize: '24px',
              fontStyle: 'italic',
              fontWeight: 700,
              textAlign: 'left',
            }}
          >
            Tasty Kitchens
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Button
              color='inherit'
              component={Link}
              to='/'
              sx={{ fontSize: '16px', fontWeight: 700, color: '#334155' }}
            >
              Home
            </Button>
            <Button
              color='inherit'
              sx={{ fontSize: '16px', fontWeight: 700, color: '#334155' }}
            >
              Cart
            </Button>
            <Button
              color='inherit'
              onClick={onclickLogout}
              sx={{
                backgroundColor: '#f7931e',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
