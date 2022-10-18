import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { pages, suras } from '../quran-resources (farawin)/quran-metadata'
import emla from '../quran-resources (farawin)/quran-text-emla'
import Besmellah from './Besmellah'


let PageContent = ({ page, id }) => {

  //variables
  let arr = []
  const [pageTemp, setPageTemp] = useState([])
  const [myPage, setMyPage] = useState(page)
  let start = 0
  let end = 0
  const [counter, setCounter] = useState([])
  const navigate = useNavigate()
  const [indexes, setIndexes] = useState([])

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

  // useEffect(() => {
  //   if (pageTemp.length > 0) {
  //     addBesmellah(pageTemp, myPage)
  //   }
  // }, [myPage])

  // useEffect(() => {
  //   countAye(pageTemp, myPage)
  // }, [pageTemp])

  useEffect(() => {
    findIndexes(pageTemp)
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
  // const addBesmellah = (pageTemp, myPage) => {
  //   for (let c = 0; c < pageTemp.length; c++) {
  //     for (let c1 = 1; c1 < suras.length; c1++) {
  //       if (emla.indexOf(pageTemp[c]) === suras[c1][0] && c1 >= pages[myPage][0] && c1 <= pages[myPage + 1][0]) {
  //         if (c1 !== c1 - 1 && c1 !== 9 && myPage !== 1) {
  //           // console.log(suras[c1][4], c)
  //           arr.splice(c, 0, 'بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ')
  //         }
  //       }
  //     }
  //   }
  // }
  //====================
  // const countAye = (pageTemp, myPage) => {
  //   for (let c = 0; c < pageTemp.length; c++) {
  //     for (let c1 = 1; c1 < suras.length; c1++) {
  //       if (emla.indexOf(pageTemp[c]) < suras[c1][0]) {
  //         // console.log(c1 - 1)
  //         break
  //       }
  //     }
  //   }
  // }
  const nextPage = () => {
    setMyPage(myPage + 1)
  }
  const prePage = () => {
    setMyPage(myPage - 1)
  }
  const findIndexes = (pageTemp) => {
    let temp = []
    for (let c = 0; c < pageTemp.length; c++) {
      temp.push(emla.indexOf(pageTemp[c]))
    }
    setIndexes(temp)
    for (let c1 = 1; c1 < suras.length; c1++) {

    }
  }
  return (
    <div>
      <h1>{myPage}</h1>
      {pageTemp.map((item, index) => {
        return (<div key={index}>
          {suras.filter((i, idx) => { return "بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ" && i[0] === indexes[index] })}
          {item}
        </div>)
      })}
      <button onClick={nextPage}>next</button>
      <button onClick={prePage}>pre</button>
      <br />
      <button onClick={() => { navigate(`/sura/${parseInt(id) + 1}`) }}>Next Sure</button>
      <button onClick={() => { navigate(`/sura/${parseInt(id) - 1}`) }}>Pre Sure</button>
      <br />
      <button onClick={() => { navigate('/') }}>Back to Menu </button>
    </div >
  )
}

export default PageContent