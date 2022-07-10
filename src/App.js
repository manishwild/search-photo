import React from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [photos, setPhotos] = React.useState([])

  async function fetchImg() {
    setLoading(true)
    try {
      const response = await fetch(`${mainUrl}${clientID}`)
      const data = await response.json()
       console.log(data)
      setPhotos(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchImg()
  }, [])

  function submitHandler(e) {
    e.preventDefault()
  }
  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input
            type="text"
            name=""
            id=""
            className="form-input"
            placeholder="Search"
          />
          <button type='submit' onClick={submitHandler} className="submit-btn"><FaSearch /></button>
        </form>
      </section>
      <section className='photos'>
        <div className="photos-center">
          {photos.map((image)=> {
            return <Photo key={image.id}{...image} />
          })}
        </div>
        {loading && <h2 className='loading'>Loading...</h2> }
      </section>
    </main>
  )
}

export default App
