
import { useEffect } from 'react'
import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { pages, suras } from '../quran-resources (farawin)/quran-metadata'
import emla from '../quran-resources (farawin)/quran-text-emla'

const Sura = () => {
  //variables
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  let { id } = useParams();
  const [content, setContent] = useState([])
  const [isPlay, setIsPlay] = useState(false)
  const audio = useRef()
  const [sutValue, setSutValue] = useState('')
  const [curr, setCurr] = useState({
    s: '',
    a: '',
  })

  //useEffects
  useEffect(() => {
    findPage(id)
  }, [id])
  useEffect(() => {
    pageContent(page)
    return () => {
      setContent([])
    }
  }, [page])
  //function
  const findPage = (id) => {
    for (let c = 1; c < pages.length; c++) {
      if (parseInt(id) === pages[c][0] && pages[c][1] === 1) {
        setPage(c)
        break
      }
      else if ((parseInt(id) === pages[c][0])) {
        setPage(c) // c-1 for pages like 106 or 255
        break;
      }
      else {
        for (let c1 = 1; c1 < 6; c1++) {
          if (parseInt(id) - c1 === pages[c][0]) {
            setPage(c)
            break
          }
        }
      }
    }
  }
  const pageContent = (page) => {

    let arr = []
    let start = suras[pages[page][0]][0] + pages[page][1] - 1
    let end = suras[pages[page + 1][0]][0] + pages[page + 1][1] - 1
    let currPage = pages[page]
    let prePage = pages[page - 1]
    let diff = currPage[0] - prePage[0]


    for (let c = start; c < (end - start) + start; c++) {
      arr.push(emla[c])
    }
    setContent(arr)
  }
  const handelNext = () => {
    {
      if (pages[page + 1][0] !== pages[page][0]) {
        console.log(pages[page + 1][0], pages[page][0]);
        navigate(`/sura/${parseInt(id) + 1}`)
      }
      if (page !== 604) {
        setPage(page + 1)
      }
    }
  }
  const handelPre = () => {

    if (pages[page - 1][0] !== pages[page][0]) {
      navigate(`/sura/${parseInt(id) - 1}`)
    }
    setPage(page - 1);
  }
  const digitCount = (number) => {
    let counter = 1
    while (number / 10 >= 1) {
      number /= 10;
      counter++
    }
    return counter

  }
  const handelSut = (sura, aya) => {

    let mySura = ''
    let myAya = ''

    let digits = {
      sura: digitCount(parseInt(sura)),
      aya: digitCount(aya)
    }
    if (digits.sura === 2) {
      mySura = '0' + sura
    }
    else if (digits.sura === 1) {
      mySura = '00' + sura
    }
    if (digits.aya === 2) {
      myAya = '0' + aya
    }
    else if (digits.sura === 1) {
      myAya = '00' + aya
    }

    setSutValue(`http://www.everyayah.com/data/Menshawi_32kbps/${mySura}${myAya}.mp3`)
  }
  const next = () => {

  }

  return (
    <div>
      <audio ref={audio} className='audio' src={sutValue} autoPlay onEnded={next} />
      <h1>{suras[id][4]}</h1>
      <h1>{page}</h1>
      {content.map((item, index) => {
        return (<div key={index}>
          {emla.indexOf(item) - suras[id][0] + 1 === 1 && <h3>بِسۡمِ اللّٰهِ الرَّحۡمٰنِ الرَّحٖیمِ</h3>}
          <p onClick={() => { handelSut(id, emla.indexOf(item) - suras[id][0] + 1) }}>
            {item}
            {emla.indexOf(item) - suras[id][0] + 1 > 0
              &&
              <span>{emla.indexOf(item) - suras[id][0] + 1}</span>}
          </p>

        </div>)
      })}
      {parseInt(id) !== 114 && < button onClick={handelNext} autoFocus>next</button>}
      {page !== 1 && <button onClick={handelPre}>pre</button>}
      <div>
        <button onClick={() => { navigate('/') }}>Back to Menu</button>
      </div>
    </div >
  )
}

export default Sura

// bugs

// tobe nabayad besmella dashte bashe
// az aval har sore nmishe rafte safe akhare sore ghabl
// safe haye ke: az nesfe safhe ye sure jadid shuru mishe bug daran
// safe haye ke bish az ye sure daran besmel shun va shumareshe ayateshun bug dare 