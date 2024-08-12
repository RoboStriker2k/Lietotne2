import Ierakstuskaits from "./components/ierakstuskaits.jsx";
import Ieraksts from "./components/ieraksts.jsx";
import Upload from "./components/upload.jsx";
import "./css/main.css";
import { useState } from "react";
import PageBTN from "./components/PageBTN.jsx";
import EditPost from "./components/editpost.jsx";
function App() {
 let [closeupload, setcloseupload] = useState(false);

 let [maxpage, setmaxpage] = useState(0);
 let [PAGEOFFSET, setPAGEOFFSET] = useState(0);
let [editpostid, seteditpostid] = useState(0);
let [editpost, seteditpost] = useState(false);

function editfn(number){
  console.log ("called")
    seteditpostid(number);
  seteditpost(true);


}


 return (
  <div>
   <div className="container">
    <div className="header">
     <header>
      <h1>Lietotne 2 -React</h1>
     </header>
    </div>
    <div id="nav">
     <div id="nav-bar">
      {closeupload ? (
       <button
        onClick={() => {
         setcloseupload(!closeupload);
        }}>
        Aizvert pievienot
       </button>
      ) : (
       <button
        onClick={() => {
         setcloseupload(!closeupload);
        }}>
        Pievienot
       </button>
      )}
      <button>Atsvaidzinat</button>
     </div>
     <div>
      <input id="searchbar" type="text" placeholder="Search" />
      <button id="search-btn">Meklēt</button>
     </div>
    </div>
    <div>
     <div>{closeupload ? <Upload CLOSBTN={() => setcloseupload(!closeupload)} /> : null}</div>
    </div>
    <div id="content">
     <p>Lietotnes ieraksti</p>
     <div id="dyncontent">
        <p>{editpostid}</p>
      <Ierakstuskaits />
      <Ieraksts getmaxpage={(maxpage) => setmaxpage(maxpage)} pageoffset={PAGEOFFSET} editpostid={(postid) => editfn(postid)} />
      <PageBTN maxpages={maxpage} getcontent={(page) => setPAGEOFFSET(page)}  />
      <div>{editpost ? <EditPost editpostid={editpostid} /> : null}</div>
        
     </div>
    </div>
   </div>

   <footer>
    <p>Lietotni veidoja Roberts Laimīte</p>
   </footer>
  </div>
 );
}

export default App;
