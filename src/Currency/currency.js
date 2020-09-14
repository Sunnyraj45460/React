import React from 'react'

export default function UseSelect(props){
    const {value,func,list}=props
    return(
        // <select value={value} onChange={e=>func(e.target.value)}>
        <select onChange={e=>func(e.target.value)}>
        {
            list.map((i,j)=>{
            return <option key={j} value={i}>{i}</option>            
            })
         }
        </select>
    )
}