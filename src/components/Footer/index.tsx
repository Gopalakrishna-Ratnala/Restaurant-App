import { Box, Typography, Link } from '@mui/material'
import PinterestIcon from '@mui/icons-material/Pinterest'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import FooterLogo from '../../assets/FooterLogo.jpg'

const Footer = () => {
  return (
    <Box
      component='footer'
      sx={{
        width: '100%',
        height: '300px',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box
          component='img'
          src={FooterLogo}
          alt='footerlogo'
          sx={{
            borderRadius: '10px',
            height: '80px',
            mr: 1,
          }}
        />
        <Typography
          variant='h4'
          sx={{
            fontFamily: 'DM Sans',
            fontSize: '32px',
            fontStyle: 'italic',
            fontWeight: 700,
            lineHeight: '48px',
            color: '#ffffff',
          }}
        >
          Tasty Kitchens
        </Typography>
      </Box>
      <Typography
        variant='body1'
        sx={{
          fontFamily: 'DM Sans',
          fontSize: '24px',
          fontWeight: 400,
          lineHeight: '32px',
          textAlign: 'center',
          color: '#ffffff',
          mb: 1,
        }}
      >
        The only thing we are serious about is food.
      </Typography>
      <Typography
        variant='body1'
        sx={{
          fontFamily: 'DM Sans',
          fontSize: '24px',
          fontWeight: 400,
          lineHeight: '32px',
          textAlign: 'center',
          color: '#ffffff',
          mb: 2,
        }}
      >
        Contact us on
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Link
          href='https://in.pinterest.com/swiggyindia/'
          target='_blank'
          rel='noreferrer'
          sx={{ mx: 1 }}
        >
          <PinterestIcon
            style={{ width: '40px', height: '40px', color: '#ffffff' }}
          />
        </Link>
        <Link
          href='https://www.instagram.com/swiggyindia/'
          target='_blank'
          rel='noreferrer'
          sx={{ mx: 1 }}
        >
          <InstagramIcon
            style={{ width: '40px', height: '40px', color: '#ffffff' }}
          />
        </Link>
        <Link
          href='https://x.com/Swiggy?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'
          target='_blank'
          rel='noreferrer'
          sx={{ mx: 1 }}
        >
          <TwitterIcon
            style={{ width: '40px', height: '40px', color: '#ffffff' }}
          />
        </Link>
        <Link
          href='https://www.facebook.com/swiggy.in/'
          target='_blank'
          rel='noreferrer'
          sx={{ mx: 1 }}
        >
          <FacebookIcon
            style={{ width: '40px', height: '40px', color: '#ffffff' }}
          />
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
