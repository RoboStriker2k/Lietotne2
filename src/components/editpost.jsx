export default EditPost;
import { useEffect, useState } from "react";
import Multiimgdisplay from "./Multiimgdisplay";
import "../css/main.css";

let removeflag = false;
var file = null;
let replaceflag = false;

// eslint-disable-next-line react/prop-types
function EditPost({ editpostid, close }) {
 let imgurl = "http://localhost:3000/getfoto/";

 const [view, setview] = useState(false);

 const [poststate, setpoststate] = useState({
  newtitle: "",
  newpdesc: "",
  ieraksti: [],
  imgarr: [],
  files: [],
  preview: [],
 });

 useEffect(() => {
  function getpost() {
   fetch(`http://localhost:3000/api/getpost/?postiid=${editpostid}`, {
    method: "GET",
   })
    .then((response) => response.json())
    .then((data) => {
     setpoststate({ ...poststate, ieraksti: data.posts, newtitle: data.posts[0].title, newpdesc: data.posts[0].pdesc });
    })
    .catch((error) => {
     console.error("Error:", error);
    });
  }

  if (editpostid != 0) {
   getpost();
   setview(true);
  }
 }, [editpostid, poststate]);

 function onMultipleFilesSelected(event) {
  let filearr = [];
  for (let i = 0; i < event.target.files.length; i++) {
   filearr.push(event.target.files[i]);
   renderpic(event.target.files[i]);
  }
  setpoststate({ ...poststate, files: filearr });
 }

 function removefromupload(fileindex) {
  let pics = poststate.preview;
  let filearr = poststate.files;
  if (fileindex != -1) {
   pics.splice(fileindex, 1);
   setpoststate({ ...poststate, preview: pics });
  }

  if (poststate.files != null) {
   if (fileindex != -1) {
    filearr.splice(fileindex, 1);
    setpoststate({ ...poststate, files: filearr });
   }
  }
 }
 function renderpic(img) {
  let imgarr = poststate.preview;
  const reader = new FileReader();
  reader.onload = (e) => {
   if (e.target) {
    imgarr.push(e.target.result) ?? "";
   }
  };
  reader.readAsDataURL(img);
  setpoststate({ ...poststate, preview: imgarr });
 }

 return (
  <>
   {view ? (
    <div id="edit" className="editview">
     <div>
      <div>
       <h1>Pievienot</h1>
       <div>
        <label htmlFor="edittitle">Ieraksta virsraksts</label>
        <input
         id="edittitle"
         type="text"
         placeholder={poststate.newtitle}
         onChange={(e) => poststate({ ...poststate, newtitle: e.target.value })}
        />
       </div>
       <div>
        <label htmlFor="editdesc">Ieraksta apraksts</label>
        <input
         id="editdesc"
         type="text"
         placeholder={poststate.newpdesc}
         onChange={(e) => poststate({ ...poststate, newpdesc: e.target.value })}
        />
       </div>
       <div>
        <p>Pievienot attēlus</p>
        <input id="editupl" multiple type="file" onChange={(e) => onMultipleFilesSelected(e)} />
       </div>
      </div>
      <div className="editier">
       <h1>Priekšskats</h1>
       <div className="editieraksts" >
       {poststate.ieraksti.map((ieraksts, index) => (
        <div  key={index}>
         <h1 id="previewtitle">{poststate.newtitle}</h1>
         <p id="previewdesc">{poststate.newpdesc}</p>
         {ieraksts.imgpath ? <img id="previewimg" src={imgurl + ieraksts.imgpath} /> : null}

         {ieraksts.imgarr ? <Multiimgdisplay imgarr={ieraksts.imgarr} editstatus={true} /> : null}
        </div>
       ))}

       {poststate.preview.map((previewimg, index) => (
        <div className="editgrid" key={index}>
         <img id="previewimg" src={previewimg} />
         <button className="removebtn" type="button" onClick={() => removefromupload(index)}>
          X
         </button>
        </div>
       ))}

       </div>
      </div>
     </div>

     <div>
      <button type="button" onClick={() => removechecked()}>
       Dzēst atzīmētos attēlus neatgriezeniski
      </button>
      <button onClick={() => editfn(poststate, editpostid)}>Labot ierakstu</button>
      <button
       onClick={() => {
        setview(false);
        close();
       }}>
       Atcelt
      </button>
      <button
       onClick={() => {
        setview(false);
        close();
       }}>
       Aizvert
      </button>
     </div>
    </div>
   ) : (
    <></>
   )}
  </>
 );
}

//todo implement  uopload preview and delete from upload
var counter = 0;
function editfn(poststate, editpostid) {
 console.log("called editfn" + counter++);
 let oldtitle = poststate.ieraksti[0].title;
 let olddesc = poststate.ieraksti[0].pdesc;
 let newtitle = poststate.newtitle;
 let newpdesc = poststate.newpdesc;

 let formdata = new FormData();
 if (oldtitle != newtitle) {
  formdata.append("title", newtitle);
 }
 if (olddesc != newpdesc) {
  formdata.append("pdesc", newpdesc);
 }
 if (file != null) {
  formdata.append("file", file);
 }
 if (this.files != null) {
  for (let i = 0; i < this.files.length; i++) {
   formdata.append("file", this.files[i]);
   console.log(i);
  }
 }
 formdata.append("replaceflag", this.replaceflag.toString());
 formdata.append("removeflag", this.removeflag.toString());
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

// eslint-disable-next-line no-unused-vars
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
 file = fileupl.files[0];
}

function removechecked() {
 let selectledelate = document.querySelectorAll("input[type=checkbox]:checked");
 let deleteform = new FormData();
 console.log("ran", selectledelate);
 if (selectledelate.length === 0) {
  return;
 } else {
  let delsel = [];
  for (let i = 0; i < selectledelate.length; i++) {
   const elem = document.getElementById(selectledelate[i].id);
   if (elem) {
    console.log(elem);
    removeflag = true;
    console.log("imagepathcheckrun", elem.classList.contains("multiimgcheck"));
    if (delsel.includes(selectledelate[i].id)) {
     continue;
    } else if (elem.classList.contains("multiimgcheck")) {
     delsel.push(selectledelate[i].id);
     this.imgarr.push(selectledelate[i].id);
     console.log("imagepathcheckrun", elem.classList.contains("multiimgcheck"));
    } else {
     delsel.push(selectledelate[i].id);
     deleteform.append("imgpath", selectledelate[i].id);
     console.log("imagerun");
    }
   }
  }

  if (this.imgarr != null) {
   deleteform.append("imgarr", JSON.stringify(this.imgarr));
  }

  deleteform.append("replaceflag", replaceflag.toString());
  deleteform.append("removeflag", removeflag.toString());
  deleteform.append("idpost", this.Posttatus.idposts.toString());
  fetch(`http://localhost:3000/api/editpost/`, {
   method: "POST",
   body: deleteform,
  })
   .then((response) => response.json())
   .then((data) => {
    console.log(data);
   })
   .catch((error) => {
    console.error("Error:", error);
   });
  removeflag = false;
  this.imgpath = "";
  this.imgarr = [];
 }

}
