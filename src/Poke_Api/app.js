import React, { useEffect, useState} from 'react'

const App=()=>{

    const [list,setList]=useState([])

    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl,setNextUrl]=useState({})
    
    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(url,{signal})
        .then(res=>res.json())
        .then(res=>{
            setNextUrl(res)
            setList(res.results.map(i=>i.name))
            // console.log('nextUrl');
            
        })
        return ()=>{
            controller.abort();
            // console.log('Download aborted');
        }
    },[url])

    return(
        <div>
            {
                list.map((i,j)=>{
                    return <span key={j}>{i}<br/></span>
                })
            }
            <br/>
            <button onClick={()=>nextUrl.previous && setUrl(nextUrl.previous)}>Prev</button>
            <button onClick={()=>nextUrl.next && setUrl(nextUrl.next)}>Next</button>
        </div>
    )
}

export default App