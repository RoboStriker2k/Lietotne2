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
 let [EditState, setEditState] = useState(false);
 let [editid, seteditid] = useState(0);
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
     <div className="content-header">
      <Ierakstuskaits />
      <h1>Lietotnes ieraksti</h1>
     </div>
     <div id="dyncontent">
      <Ieraksts
       getmaxpage={(maxpage) => setmaxpage(maxpage)}
       pageoffset={PAGEOFFSET}
       editid={(postid) => {seteditid(postid);setEditState(true);}}
      />
      <PageBTN maxpages={maxpage} getcontent={(page) => setPAGEOFFSET(page)} />
      <div>
       {EditState ? (
        <EditPost editid={editid} close={() => setEditState(false)} />
       ) : null}
      </div>
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
