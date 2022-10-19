import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pages, suras } from '../quran-resources (farawin)/quran-metadata'
import emla from '../quran-resources (farawin)/quran-text-emla'

let PageContent = ({ page, id }) => {

  //variables
  let cnt = 0
  const [suraPages, setSuraPages] = useState(0)
  let arr = []
  const [pageTemp, setPageTemp] = useState([])
  const [myPage, setMyPage] = useState(page)
  let start = 0
  let end = 0
  const navigate = useNavigate()
  const [indexes, setIndexes] = useState([])
  const [allStarts, setAllStarts] = useState([])


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
    suraPageCountForward()
    if (suraPages === 1) {
      navigate(`/sura/${parseInt(id) + 1}`)
    }
  }, [myPage])

  useEffect(() => {
    starts()
  }, [])


  //functions

  const pageCreator = (myPage) => {
    start = suras[pages[myPage][0]][0] + pages[myPage][1] - 1
    end = suras[pages[myPage + 1][0]][0] + pages[myPage + 1][1] - 1

    for (let c = start; c < (end - start) + start; c++) {
      arr.push(emla[c])
    }
    setPageTemp(arr)
  }
  const nextPage = () => {
    setMyPage(myPage + 1)
  }
  const prePage = () => {
    setMyPage(myPage - 1)
  }
  const suraPageCountForward = () => {
    for (let c = myPage; c < pages.length; c++) {
      if (pages[c][0] !== parseInt(id)) {
        break
      }
      cnt++
    }
    setSuraPages(cnt)
  }
  const starts = () => {
    let arr = []
    for (let c = 1; c < suras.length; c++) {
      const sureDetail = {}
      sureDetail.start = suras[c][0]
      sureDetail.name = suras[c][4]
      sureDetail.count = c
      arr.push(sureDetail)
    }
    setAllStarts(arr)
  }
  return (
    <div>
      <h1>Page: {myPage}</h1>
      <h2>Pages Left to end of this sura: {suraPages}</h2>
      {pageTemp.map((item, index) => {
        return (<h3 key={index}>
          {allStarts.map((i, idx) => {
            return (<div key={idx}>
              {emla.indexOf(item) === i.start && <div>
                <h1>{i.name}</h1>
                {i.start !== 1235 && <h3> بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ</h3>}
              </div>}
            </div>)
          })}
          <br />{item}
        </h3>)
      })}
      <button onClick={nextPage}>next</button>
      <button onClick={prePage}>pre</button>
      <br />
      <button onClick={() => { navigate(`/sura/${parseInt(id) + 1}`) }}>Next Sure</button>
      <button onClick={() => { navigate(`/sura/${parseInt(id) - 1}`) }}>Pre Sure</button>
      <br />
      <button onClick={() => { navigate('/') }}>Back to Menu</button>
    </div >
  )
}

export default PageContent