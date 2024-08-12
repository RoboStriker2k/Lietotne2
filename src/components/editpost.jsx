export default EditPost;
import {  useEffect,    useState } from "react";



var file = null;
// eslint-disable-next-line react/prop-types
function EditPost({ editpostid }) {
let [newtitle, settitle] = useState("");
let [newpdesc, setpdesc] = useState("");


let imgurl = "http://localhost:3000/getfoto/";
let [ieraksti, setIeraksti] = useState([]);
let [view,setview] = useState(false);


useEffect(() => {



  function getpost() {

    fetch(`http://localhost:3000/api/getpost/?postiid=${editpostid}`, {
     method: "GET",
    })
     .then((response) => response.json())
     .then((data) => {
      setIeraksti(data.posts);
      settitle(data.posts[0].title);
      setpdesc(data.posts[0].pdesc);
     })
     .catch((error) => {
      console.error("Error:", error);
     });
   }
   
  if (editpostid != 0) {
   
   getpost();
   setview(true);
  }



}, [editpostid]);


 
 return ( <>
 { (view) ? (

    <div id="edit" className="editview"> 
      <div>
       <div>
        <h1>Pievienot</h1>
        <p>Ieraksta virsraksts</p>
        <input id="edittitle" type="text" placeholder={newtitle} onChange={(e) => settitle(e.target.value)}   />
        <p>Ieraksta apraksts</p>
        <input id="editdesc" type="text" placeholder={newpdesc}  onChange={(e) => setpdesc(e.target.value)}/>
        <div>
         <p>Ieraksta attels (var nepievienot)</p>
         <input id="editupl" type="file" onChange={(e) => onFileSelected(e)} />
   
        </div>
       </div>
       {ieraksti.map((ieraksts, index) => (
        <div className="editier" key={index}>
         <h1>Priekšskats</h1>
         <div className="ieraksts">
          <h1 id="previewtitle">{newtitle}</h1>
          <p id="previewdesc">{newpdesc}</p>
         <img id="previewimg" src={imgurl + ieraksts.imgpath}  /> 
         </div>
        </div>
       ))}
      </div>
   

     <div>
      <button  onClick={()=>editfn(newtitle, newpdesc, newtitle, newpdesc,editpostid)}>
       Labot ierakstu
      </button>
      <button  onClick={() => setview(false)  }>
       Atcelt
      </button>
      <button  onClick={ () => setview(false) }>
       Aizvert
      </button>
     </div>
    </div>
 ) : ( <></> ) }
 </>
 );
}



var counter =0;
function editfn ( oldtitle, olddesc, newtitle, newpdesc,editpostid) {
    console.log ("called editfn"+counter++)
     
       let formdata = new FormData();
       if (oldtitle != newtitle) {
       formdata.append("title", newtitle);
       }
       if (olddesc != newpdesc) {
       formdata.append("pdesc", newpdesc);
       }
       if (file != null) {
        formdata.append('file', file)
      }
       formdata.append("idpost", editpostid);
     
       fetch(`http://localhost:3000/api/editpost/`, {
        method: "POST",
        body: formdata,
       })
        .then((response) => response.json())
        .catch((error) => {
         console.error("Error:", error);
        });
    }

    function onFileSelected() {
        let fileupl = document.getElementById("editupl");
        let preview = document.getElementById("previewimg");
        if (fileupl.files.length === 0) {
         return;
        }
        let reader = new FileReader();
        reader.onload = function () {
         preview.src = reader.result;
        };
        reader.readAsDataURL(fileupl.files[0]);
        file=fileupl.files[0];
       }
       