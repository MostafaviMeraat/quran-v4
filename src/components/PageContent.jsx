import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { pages, suras } from '../quran-resources (farawin)/quran-metadata'
import emla from '../quran-resources (farawin)/quran-text-emla'

let PageContent = ({ page, id }) => {

  //variables
  let arr = []
  let ayeCounter = []
  const [ayeNumber, setAyeNumber] = useState([])
  const [pageTemp, setPageTemp] = useState([])
  const [myPage, setMyPage] = useState(page)
  let start = 0
  let end = 0
  const [counter, setCounter] = useState([])
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)

  //useEffects
  useEffect(() => {
    setMyPage(page)
  }, [page])

  useEffect(() => {
    pageCreator(myPage)
    return () => {
      setPageTemp([])
    }
  }, [myPage])

  useEffect(() => {
    if (pageTemp.length > 0) {
      addBesmellah(pageTemp, myPage)
    }
    console.log(arr);
  }, [myPage, pageTemp])

  useEffect(() => {
    countAye(pageTemp, myPage)
  }, [pageTemp])

  //functions

  const pageCreator = (myPage) => {
    start = suras[pages[myPage][0]][0] + pages[myPage][1] - 1
    end = suras[pages[myPage + 1][0]][0] + pages[myPage + 1][1] - 1

    for (let c = start; c < (end - start) + start; c++) {
      arr.push(emla[c])
    }
    setPageTemp(arr)
  }

  const addBesmellah = (pageTemp, myPage) => {
    const arr2 = [...arr]
    for (let c = 0; c < pageTemp.length; c++) {
      for (let c1 = 1; c1 < suras.length; c1++) {
        if (emla.indexOf(pageTemp[c]) === suras[c1][0] && c1 >= pages[myPage][0] && c1 <= pages[myPage + 1][0]) {
          if (c1 !== c1 - 1 && arr2[0] !== 'بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ' && c1 !== 9) {
            console.log(suras[c1][4], c);
            arr2.splice(c, 0, 'بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ')
          }
        }
      }
    }
    setPageTemp(pageTemp)
  }
  const countAye = (pageTemp, myPage) => {
    for (let c = 0; c < pageTemp.length; c++) {
      for (let c1 = 1; c1 < suras.length; c1++) {
        if (emla.indexOf(pageTemp[c]) < suras[c1][0]) {
          // console.log(c1 - 1)
          break
        }
      }
    }
  }
  const nextPage = () => {
    setMyPage(myPage + 1)
  }
  const prePage = () => {
    setMyPage(myPage - 1)
  }
  // console.log(ayeNumber);
  return (
    <div>
      <h1>{myPage}</h1>
      {pageTemp.map((item, index) => {
        return (item !== "بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ" ?
          <h3 key={index}>{item}{counter[index]}</h3>
          : <h1 key={index}>{item}{counter[index]}</h1>)
      })}
      <button onClick={nextPage}>next</button>
      <button onClick={prePage}>pre</button>
      <br />
      <button onClick={() => { navigate(`/sura/${parseInt(id) + 1}`) }}>Next Sure</button>
      <button onClick={() => { navigate(`/sura/${parseInt(id) - 1}`) }}>pre Sure</button>
      <br />
      <button onClick={() => { navigate('/') }}>Back to Menu </button>
    </div >
  )
}

export default PageContent