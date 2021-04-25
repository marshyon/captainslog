import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'
import { useHistory } from 'react-router-dom'
import env from 'react-dotenv'

export default function Logs({userInfo}) {
  const [logs, setLogs] = useState([]);
  const history = useHistory()


  useEffect(() => {
    console.log("user password in logs> ", userInfo.password)
    console.log("    user name in logs> ", userInfo.user)
    fetch( env.API_URL + "/logs")
      .then(res => res.json())
      .then(data => setLogs(data.data))
  }, [])

  const handleDelete = async (id) => {
    await fetch(env.API_URL + "/logs/" + id, {
      method: 'DELETE'
    })
    const newLogs = logs.filter(note => note.id != id)
    setLogs(newLogs)
  }

  const handleEdit = async (id) => {
    const editURL = '/edit/' + id
    console.log("in EDIT with ID : ", id, " => ", editURL)
    history.push(editURL)
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column">
        {logs.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
