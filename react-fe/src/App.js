import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Logs from './pages/Logs'
import Create from './pages/Create'
import Edit from './pages/Edit'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout'

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Logs />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/edit">
              <Edit />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
