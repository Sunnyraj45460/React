import React, {useEffect, useState, useRef,useMemo} from 'react'

const App=()=>{
    
    const [q,setQ]=useState('')
    const [page,setPage]=useState(1)
    const [list,setList]=useState([])

    const [url,setUrl]=useState(`https://openlibrary.org/search.json?q=${q}&page=${page}`)

    useEffect(()=>{
        // console.log('setUrl');
        setList([])
        setUrl(`https://openlibrary.org/search.json?q=${q}&page=${page}`)
    }
    ,[q])

    useMemo(()=>{
        setUrl(`https://openlibrary.org/search.json?q=${q}&page=${page}`)
    }
    ,[page])

    const controller = new AbortController();
    const signal = controller.signal;
    
    useEffect(()=>{
        fetch(url,{signal})
        .then(res=>res.json())
        .then(res=>{
            // setList(list.concat(res.docs.map(i=>i.title)))
            setList(...list,res.docs.map(i=>i.title))
            // setList(res.docs.map(i=>i.title))
            // console.log('nextUrl');
            // console.log(list);
        })
        .catch(()=>{})
        return ()=>{
            controller.abort();
            // console.log('Download aborted')
        }
    },[url])

    // console.log('list',list);
    // console.log(page);
    // console.log(q);


        // const [div,kk]=useState(React.useRef())
        // useMemo(()=>{
        //     console.log(33333);
        //         kk(div)
        //     },[div])
        // if(div){
                    // console.log(div);
                    // if(div.current.childNodes.length>1)
            // console.log(div.current.childNodes.length);
        // }


        const observer = useRef()
        // console.log(observer);
        const lastBookElementRef = React.useCallback(node => {
        //   if (loading) return
          if (observer.current) observer.current.disconnect()
          observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting ) {
              setPage(prevPage => prevPage + 1)
            }
          })
          if (node) observer.current.observe(node)
        }, [])

        // let dk=document.getElementById('root')
        // dk.getBoundingClientRect().top

        // const span = useRef()
        // window.addEventListener('scroll',()=>{
        //     if(span.current.getBoundingClientRect().bottom < window.innerHeight){
        //         setPage(page + 1)
        //         // window.removeEventListener('scroll',()=>{})
        //     }
        // //    console.log( window.innerHeight)
        // //    console.log( span.current.getBoundingClientRect().bottom)
        // })
    
    return(
        //
        <div className='div'>
            <input onChange={e=>setQ(e.target.value)} type="text"/>
            <button onClick={()=>1 && setPage(page-1)}>Prev</button>
            <button onClick={()=>1 && setPage(page+1)}>Next</button>
            <br/>
            <div>
            {
                list.length===0 ? 'Loading...':
                list.map((i,j)=>{
                    // console.log(list);
                    if(j===list.length-1){
                        console.log('df',list.length);
                        //ref={lastBookElementRef}
                return <span ref={()=>lastBookElementRef} key={j}>{i}<br/></span>
                }
                    return <span key={j}>{i}<br/></span>
                })
            }
            </div>
        </div>
    )
}

export default App