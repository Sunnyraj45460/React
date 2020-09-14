import React,{useEffect} from 'react'

export default function Script() {

    useEffect(() => {
        fetch('http://localhost:4000/',{
            headers:{'Access-Control-Allow-Origin':'*'}
        })
        .then(res=>res.json())
        // .then(res=>res.text())
        .then(res=>console.log(res))
        return () => {}
    }, [])

    return (
        <div>
            999
        </div>
    )
}
