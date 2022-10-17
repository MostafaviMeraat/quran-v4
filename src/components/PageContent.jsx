import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { pages, suras } from '../quran-resources (farawin)/quran-metadata'
import emla from '../quran-resources (farawin)/quran-text-emla'

let PageContent = ({ page }) => {

  //variables
  let arr = []
  let ayeCounter = []
  const [ayeNumber, setAyeNumber] = useState([])
  const [pageTemp, setPageTemp] = useState([])
  const [myPage, setMyPage] = useState(page)
  let start = 0
  let end = 0
  const [counter, setCounter] = useState([])

  //useEffects
  useEffect(() => {
    setMyPage(page)
  }, [page])

  useEffect(() => {
    pageCreator(myPage)
  }, [myPage])

  useEffect(() => {
    if (pageTemp.length > 0) {
      addBesmellah(pageTemp, myPage, start, end)
    }
  }, [myPage])

  useEffect(() => {
    if (pageTemp.length > 0) {
      addBesmellah(pageTemp, myPage, start, end)
    }
  }, [pageTemp])

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

  const addBesmellah = (pageTemp, myPage, start, end) => {
    // console.log(pageTemp);

    // for (let c = 0; c < pageTemp.length; c++) {
    //   if (true) {
    //     for (let c1 = 1; c1 < suras.length; c1++) {
    //       if (suras[c1][0] === emla.indexOf(pageTemp[c]) && emla.indexOf(pageTemp[c]) !== 0) {
    //         console.log('here');
    //         arr.splice(c, 0, 'بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ')
    //       }
    //     }
    //   }
    // }
  }
  const countAye = (pageTemp, myPage) => {
    for (let c = 0; c < pageTemp.length; c++) {
      for (let c1 = 1; c1 < suras.length; c1++) {
        if (emla.indexOf(pageTemp[c]) < suras[c1][0]) {
          console.log(c1 - 1)
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
  console.log(ayeNumber);
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
    </div >
  )
}

export default PageContent