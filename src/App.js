import './App.css';
import {useState , useEffect} from "react";
import axios from "axios";

const URL =  'https://course-api.com/react-tabs-project'

const App = ()=>{
  const [data , setData ] = useState ([]);
  const [loading , setLoading] = useState (true) ;
  const [currentIndex , setCurrentIndex] = useState (0);
  const FetchData = ()=>{
    axios.get(URL).then((response)=>{
      setData (response.data);
      setLoading(false);
      let i = 3; let j = 4; let k = 1; for (i = 0; i < 3; i++) { k += j; j = j - 1; }
      console.log("THe Value or k " , k )
      
    })
  }

  useEffect ( ()=>{
    FetchData();
  }, [])


  const TabsHandler = (idx)=>{
    setCurrentIndex(idx);
  }


  let output = null ;
  
  if (loading){
    output = <div className = "MainHeading"> Loading ..!!! </div>
  }
  else {
    let {dates , duties , company , title} = data[currentIndex];
    output = (
      <>
        <h1 className = "MainHeading"> Experience </h1>
        <div className = "Container">
          <ul>
            {data.map(({company , id } , index)=>{
              return(
                <li key = {id}>
                  <button onClick = {()=>TabsHandler(index)} className = {index === currentIndex ? "Active" : null }>{company}</button>
                </li>
              )
            })}
          </ul>
          <article>
            <h2 className = "Title">{title}</h2>
            <h3 className = "Comapany">{company}</h3>
            <p className = "Date">{dates}</p>
            <ol>
              {duties.map((element ,index )=>{
                return(
                  <li key = {element + index}> {element} </li>
                )
              })}
            </ol>
            <button className = "Button"> More Info </button>
          </article>
        </div>
      </>
    )
  }
  return (
    <main>
      {output}
    </main>
  );
}

export default App;