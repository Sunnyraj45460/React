import React,{useState,useEffect} from 'react'
import UseSelect from './currency'

export default function App() {
    
    const [base,setBase]=useState('INR')
    const [symbols,setSymbols]=useState('USD')
    const [rate,setRate]=useState(0)
    
    const [list,setList]=useState([])
    
    const Primaryurl='https://api.exchangeratesapi.io/latest'
    const [url,setUrl]=useState(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`)
    
    const from=React.useRef()
    const to=React.useRef()
    
    useEffect(()=>{
        fetch(Primaryurl)
        .then(res=>res.json())
        .then(res=>{
            setList(Object.keys(res.rates))
        })
        return ()=>{}
    },[])
    
    const controller = new AbortController();
    const signal = controller.signal;
    
    
    useEffect(()=>{
        setUrl(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`)
        fetch(url,{signal})
        .then(res=>res.json())
        .then(res=>{
            setRate(res.rates[symbols])
            to.current.value=rate*parseFloat(from.current.value)
            from.current.value=rate/parseFloat(to.current.value)
        })
        .catch(()=>{})
        return ()=>{
            controller.abort();
        }
    },[url,base,symbols,rate])

    const toOnChange=e=>{
        if(e.target.id==='from'){
            if(e.target.value==='')return to.current.value=''
            to.current.value=rate*parseFloat(e.target.value)
        }
        else{
            from.current.value=rate/parseFloat(e.target.value)
        }
    }

    return (
        <div>
            <input defaultValue={1} id='from' ref={from} type="number" onChange={e=>toOnChange(e)}/>
            <UseSelect {...{value:base, func:setBase ,list:list}}/><br/>
            <input type="number" id='to' ref={to} onChange={e=>toOnChange(e)}/> 
            <UseSelect {...{value:symbols, func:setSymbols ,list:list}}/>
        </div>
    )
}

