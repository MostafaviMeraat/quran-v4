import React from 'react'
import { pages, suras } from '../quran-resources (farawin)/quran-metadata'
import { useNavigate } from 'react-router-dom'

const Search = () => {

  const navigate = useNavigate()

  const clickedSura = (index) => {
    navigate(`/sura/${index}`)
  }
  return (
    <div className='suras'>
      {suras.map((item, index) => {
        return (<div className='sura' key={index} onClick={() => { clickedSura(index) }}>
          {item[4]}
        </div>)
      })}
    </div>
  )
}

export default Search