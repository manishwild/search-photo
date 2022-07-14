import React from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

const App = () => {
  // useState
  const [loading, setLoading] = React.useState(false)
  const [photos, setPhotos] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [query, setQuery] = React.useState('')
  const [newImages, setNewImages] = React.useState(false)
// useRef
  const mounted = React.useRef(false)
// fetch function
  async function fetchImg() {
    setLoading(true)
    let url
    const urlPage = `&page=${page}`
    const urlQuery = `&query=${query}`

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    } else {
      url = `${mainUrl}${clientID}${urlPage}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setPhotos((oldPhoto) => {
        if (query && page === 1) {
          return data.results
        } else if (query) {
          return [...oldPhoto, ...data.results]
        } else {
          return [...oldPhoto, ...data]
        }
      })
      setNewImages(false)
      setLoading(false)
    } catch (error) {
      setNewImages(false)
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchImg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // React.useEffect(() => {
  //   const event = window.addEventListener('scroll', () => {
  //     // console.log(`innerHeight ${window.innerHeight}`)
  //     // console.log(`scrollY ${window.scrollY}`)
  //     // console.log(`body height ${document.body.scrollHeight}`)
  //     if (
  //       !loading &&
  //       window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
  //     ) {
  //       setPage((oldPage) => {
  //         return oldPage + 1
  //       })
  //     }
  //   })
  //   return () => window.removeEventListener('scroll', event)
  //   // eslint-disable-next-line
  // }, [])

  // this useEffect will not run in intial render
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    // console.log('second')
    if (!newImages) return
    if (loading) return
    setPage((oldPage) => oldPage + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newImages])

  // event
  function event() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true)
    }
  }
// This useeffect will render when we use useScoll eventlistner and after that it will be reomved by remove eventlistner
  React.useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  // for search when we submit
  function submitHandler(e) {
    e.preventDefault()
    if (!query) return
    if (page === 1) {
      fetchImg()
    }
    setPage(1)
  }
  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" onClick={submitHandler} className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  )
}

export default App
