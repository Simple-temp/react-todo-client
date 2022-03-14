import React, { useEffect, useState } from "react";
import Todo from "./component/Todo";
import loading from "./img/loading.gif"
import "./App.css"

function App() {

  const [info, setInfo] = useState({})
  const [getinfo, setgetinfo] = useState([])

  const handleBlur = (e) => {
    const newInfo = { ...info }
    newInfo[e.target.name] = e.target.value
    setInfo(newInfo)
  }


  const handleSubmit = (e) => {
      fetch(`https://plucky-fluoridated-spatula.glitch.me/posttodo`, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: { 'Content-type': 'application/json' }
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
          // alert("add to database")
          console.log(data)
        });
      // e.preventDefault()
      console.log(info)
  }

  useEffect(() => {
    fetch(`https://plucky-fluoridated-spatula.glitch.me/gettodo`)
      .then(res => res.json())
      .then(data => setgetinfo(data))
  }, [])


  return (
    <div className="container mt-5 app d-flex justify-content-center align-items-center">
      <div className="col-lg-5 col-md-6 col-12">
        <div className="show-todo">
          <form action="" className="d-flex my-3">
            <input required onBlur={handleBlur} type="text" name="name" placeholder="Add todo" className="w-100" />
            <i class="fa-solid fa-plus" onClick={(e)=>handleSubmit(e)} type="submit"></i>
          </form>
          <div className="show">
            {
              getinfo.length === 0 && <img src={loading} alt="" style={{ width: "130px" }} className="mx-auto loading" />
            }
            {
              getinfo.map(item => <Todo item={item} key={item._id}></Todo>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
