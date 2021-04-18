import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})
export default function EditForm({ log }) {
    
    
    const [content, setContent] = useState('')




  const handleSubmit = (e) => {
    e.preventDefault()


    console.log("HERE in Edit - handle submit")
  }

  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        NEW Edit a Log with {log.title}
      </Typography>


      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
          { log.content }
      </Typography>

      <form noValidate autoComplete="off">
        <TextField 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          value={log.content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* <TextField className={classes.field}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={contentError}
          defaultValue={'title : ' + log.title + ' content : ' + log.content}
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
        </Button> */}
      </form>

      
    </Container>
  )
}
