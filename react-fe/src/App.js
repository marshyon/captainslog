import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Logs from './pages/Logs'
import Create from './pages/Create'
import Edit from './pages/Edit'
import Login from './pages/Login'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout'
// import React, { useEffect } from 'react'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Share Tech',
    fontWeightLight: 500,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

let userInfo = {
  "user": "",
  "password": ""
}


// useEffect(() => {
// })

function App() {
console.log("user password in root component> ", userInfo.password)
console.log("    user name in root component> ", userInfo.user)
return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Logs userInfo={userInfo} />
            </Route>
            <Route path="/create">
              <Create userInfo={userInfo}/>
            </Route>
            <Route path="/login">
              <Login userInfo={userInfo}/>
            </Route>            
            <Route path="/edit">
              <Edit userInfo={userInfo}/>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
