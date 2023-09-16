import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginRight: '10px',
    marginTop: '5px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
      display: 'flex',
     }
  },
  toolbar: {
    display: 'flex',
    // flexDirection: 'flex-end',
    width: '400px',
    justifyContent: 'flex-end',
  },
  profile: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    }

},
  logout: {
    marginLeft: '20px',
    [theme.breakpoints.down('xs')] : {
      marginLeft: '15px',
    }
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '20px',

    }
  },
  brandContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',

    }
  },
  txtImg: {
    [theme.breakpoints.down('sm')]: {
      visibility: 'hidden',
      display: 'none',
    }
  }
}));