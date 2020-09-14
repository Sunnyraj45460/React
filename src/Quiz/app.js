import React,{useEffect,useState} from 'react'
import UseSelect from '../Quiz/UseSelect'
import './main.css'

const Reducerfunc=(state,{typee,payload})=>{
    switch (typee) {
        case 'category':return{...state,categoryList:payload}
        case 'setCategory':return {...state,category:payload}
        case 'setDifficulty':return {...state,difficulty:payload}
        case 'setType':return {...state,type:payload}
        case 'setAmount':return {...state,amount:payload}
        }
    }
    
    
export default function App() {

    const [Reducer,setReducer]=React.useReducer(Reducerfunc,{
        amount:10,
        category:'',
        difficulty:'',
        type:'',
        categoryList:[],
        difficultyList:["easy","medium","hard"],
        typeList:["multiple","boolean"]
    })
    const {amount,category,difficulty,type,categoryList,difficultyList,typeList}=Reducer

    const Primaryurl=`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    
    const [question,setQuestion]=useState({})
    const [loading,setLoading]=useState(true)
    
    
    const [url,setUrl]=useState(Primaryurl)
    
    
    useEffect(()=>{
        fetch('https://opentdb.com/api_category.php')
        .then(res=>res.json())
        .then(res=>{
            setReducer({typee:'category',payload:res.trivia_categories.map(i=>i)})   
        })
        return ()=>{}
    },[])
    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            setQuestion({...question,results:res.results})
            setLoading(false)
        })
        return ()=>{}
    },[url])

    setTimeout(()=>{
        const questionContainers=document.querySelectorAll(".question-containers")
        questionContainers.forEach(i=>{
            i.addEventListener("click",()=>{
                i.classList.toggle("clicked")
            })
        })
    },1000)

    return (
        <div>
            <span id='head'>Quiz Trivia</span>
        <form id='form' onSubmit={e=>{e.preventDefault();setUrl(Primaryurl);setLoading(true)}}>
            <input defaultValue={10} min={1} type="number" onChange={e=>{setReducer({typee:'setAmount',payload:e.target.value})}}/>
            {loading ? <select></select>:
            <UseSelect {...{ list:categoryList,func:setReducer,typee:'setCategory'}}/>}
            <UseSelect {...{ list:difficultyList,func:setReducer,typee:'setDifficulty'}}/>
            <UseSelect {...{ list:typeList,func:setReducer,typee:'setType'}}/>
            <button type="submit">Submit</button>
        </form>
            <div id='main-div'>
            {loading ? 'loading...':
                question.results.map((i,j)=>{
                    return (
                    <div className='question-containers' key={j}>
                      <span key={'q'+j}>{i.question}</span>
                      {i.incorrect_answers.map((i,j)=>{
                          return <div key={'back'+j}>{i}</div>
                      })}
                      <div key={'ca'+j} className='anstyle'>{i.correct_answer}</div>
                      <div key={'back'+j} className='answers'>
                          <span>{i.correct_answer}</span>
                      </div>
                    </div>
                    )
                })
            }
            </div>
        </div>
    )
}