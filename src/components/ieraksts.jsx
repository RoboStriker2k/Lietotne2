export default Ieraksts;
import { DeletePost } from "./DeletePost";
import { useEffect, useState } from "react";
import Multiimgdisplay from "./Multiimgdisplay";
// eslint-disable-next-line react/prop-types
function Ieraksts({ getmaxpage, pageoffset, editpostid }) {
 let [ieraksti, setIeraksti] = useState([]);
 let imgurl = "http://localhost:3000/getfoto/";
 let [maxpage, setmaxpage] = useState(0);
 let getpostammount = 5;
 let [poffset, setpoffset] = useState(0);
 let [psearch, setpsearch] = useState("");
 let [deletestatus, setdeletestatus] = useState(false);
 let [postcnt, setpostcnt] = useState(0);


 useEffect(() => {
  setpoffset(pageoffset);
  document.getElementById("searchbar").addEventListener("input", (e) => {
   setTimeout(() => {
    setpsearch(e.target.value);
   }, 1000);
  });

  function getposts(ammount = getpostammount, offset = poffset, searchtext = psearch) {
   const formdata = new FormData();

   formdata.append("ammount", ammount);
   formdata.append("offset", offset);
   formdata.append("searchtext", searchtext);

   fetch("http://localhost:3000/search", {
    method: "post",
    body: formdata,
   })
    .then((response) => response.json())
    .then((data) => {
     setIeraksti(data.posts);
     pagecalc(data.count);
     setpostcnt(data.count);
    })
    .catch((error) => {
     console.error("Error:", error);
    });
  }

  function pagecalc(count) {
   setmaxpage(Math.ceil(count / getpostammount) - 1);
   getmaxpage(maxpage);
  }

  getposts();

  return () => {};
 }, [deletestatus, getmaxpage, getpostammount, maxpage, pageoffset, poffset, psearch]);
 function toggledelete() {
  setdeletestatus(!deletestatus);
 }

 function deletest() {
  let selectledelate = document.querySelectorAll("input[type=checkbox]:checked");
  if (deletestatus && selectledelate.length > 0) {
   DeletePost();
   toggledelete();
  }
 }

 return (
  <div>
  
   <div id="dzest">
    {deletestatus ? (
     <div>
      <button id="deletebtn" type="button" onClick={deletest}>
       Dzest ierakstus
      </button>
      <button onClick={toggledelete}>Atcelt dzešanu</button>
     </div>
    ) : (
     <button onClick={toggledelete}>Ierakstu atlase</button>
    )}
   </div>
 <div id="postcntbox">
    <p>Atrasto ierakstu skaits:{postcnt}</p>
   </div>
   <div id="ieraksti" className="iecontent">
    {ieraksti.lenght === 0 ? <p>Nav ierakstu</p> : null}

    {ieraksti.map((ieraksts, index) => (
     <div className="ieraksts" key={index} id={ieraksts.idposts}>
      {deletestatus ? <input type="checkbox" id={ieraksts.idposts} /> : null}
      <h1>{ieraksts.title}</h1>
      <p>{ieraksts.pdesc}</p>
      {ieraksts.imgpath ? <img src={imgurl + ieraksts.imgpath} alt={ieraksts.title} /> : null}
      {ieraksts.imgarr ? <Multiimgdisplay imgarr={ieraksts.imgarr}  /> : null}
      <button type="button" onClick={() => editpostid(ieraksts.idposts)}>Labot</button>
     </div>
    ))}
   </div>
  </div>
 );
}
