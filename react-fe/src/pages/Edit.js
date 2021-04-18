import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { useHistory } from 'react-router-dom'
import env from "react-dotenv";


// import EditForm from '../pages/EditForm'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Edit() {
  const classes = useStyles()
  const history = useHistory()
  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [category, setCategory] = useState('money')
  const [author, setAuthor] = useState('kirk')

  const [log, setLog] = useState({});

 

  useEffect(() => {
    const urlParams = window.location.pathname.split('/')
    const dataURLToFetch = env.API_URL + "/logs/" + urlParams[2]

    fetch(dataURLToFetch)
      .then(res => res.json())
      .then(
        (data) => {
          console.log('title : >> ', data.data.title)
          console.log('content : >> ', data.data.content)
          setTitle(data.data.title)
          setContent(data.data.content)
          setID(urlParams[2])
        }
      )
    
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setContentError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (content == '') {
      setContentError(true)
    }


    console.log('>>DEBUG>> handleSubmit :: content is : ', content)
    console.log('>>DEBUG>> handleSubmit :: title is : ', title)
    console.log('>>DEBUG>> handleSubmit :: category is : ', category)

    if (title && content) {
      const myUrl = env.API_URL + "/logs/" + id
      fetch(myUrl, {
        method: 'PATCH',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ id, title, content, category, author })
      }).then(() => history.push('/'))
    }   

  }

  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Edit a Log
      </Typography>


      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={titleError}
          value={title}
        />
        <TextField className={classes.field}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={contentError}
          value={content}
        >
        </TextField>

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>

      
    </Container>
  )
}
