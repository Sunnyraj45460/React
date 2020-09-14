import React from 'react'

export default function UseSelect(props){
    const {func,list,typee}=props
    return(
        <select className={'.forms'} onChange={e=>{func({typee,payload:e.target.value})}}>
        {
            list.map((i,j)=>{
                if(i.id)return <option key={j} value={i.id}>{i.name}</option>
            return <option key={j} value={i}>{i}</option>            
            })
         }
        </select>
    )
}
