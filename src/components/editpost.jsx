export default EditPost;
import { useEffect, useState } from "react";
import Multiimgdisplay from "./Multiimgdisplay";
// eslint-disable-next-line react/prop-types
function EditPost({ editid, close }) {
 let imgurl = "http://localhost:3000/getfoto/?file=";

 const [poststate, setpoststate] = useState({
  newtitle: "",
  newpdesc: "",
  ieraksti: [],
  imgarr: [],
  files: [],
  preview: [],
 });
 let [singlerun, setsinglerun] = useState(true);
 useEffect(() => {
  function getpost() {
   fetch(`http://localhost:3000/api/getpost/?postiid=${editid}`, {
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

  if (singlerun) {
   getpost();
   setsinglerun(false);
  }
 }, [editid, poststate, singlerun]);

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

 function removechecked() {
  console.log("removing checked");
  let selectledelate = document.querySelectorAll("input[type=checkbox]:checked");
  let deleteform = new FormData();
  let removeflag = true;
  let replaceflag = false;
  let imgarr = [];
  if (selectledelate.length === 0) {
   return;
  } else if (selectledelate.length > 1) {
   for (let i = 0; i < selectledelate.length; i++) {
    const elem = document.getElementById(selectledelate[i].id);
    if (elem) {
     removeflag = true;
     if (imgarr.includes(selectledelate[i].id)) {
      continue;
     } else if (elem.classList.contains("multiimgcheck")) {
      imgarr.push(selectledelate[i].id);
     } else {
      imgarr.push(selectledelate[i].id);
      deleteform.append("imgpath", selectledelate[i].id);
     }
    }
   }
  } else if (selectledelate.length == 1) {
   imgarr.push(selectledelate[0].id);
  }

  if (imgarr != null) {
   deleteform.append("imgarr", JSON.stringify(imgarr));
  }
  deleteform.append("replaceflag", replaceflag.toString());
  deleteform.append("removeflag", removeflag.toString());
  deleteform.append("idpost", editid.toString());
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
 }

 return (
  <>
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
        onChange={(e) => setpoststate({ ...poststate, newtitle: e.target.value })}
       />
      </div>
      <div>
       <label htmlFor="editdesc">Ieraksta apraksts</label>
       <input
        id="editdesc"
        type="text"
        placeholder={poststate.newpdesc}
        onChange={(e) => setpoststate({ ...poststate, newpdesc: e.target.value })}
       />
      </div>
      <div>
       <p>Pievienot attēlus</p>
       <input id="editupl" multiple type="file" onChange={(e) => onMultipleFilesSelected(e)} />
      </div>
     </div>
     <div className="editier">
      <h1>Priekšskats</h1>
      <div className="editieraksts">
       {poststate.ieraksti.map((ieraksts, index) => (
        <div key={index}>
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
     <button onClick={() => editfn(poststate, editid)}>Labot ierakstu</button>
     <button
      onClick={() => {
       close();
       setsinglerun(true);
      }}>
      Atcelt
     </button>
     <button
      onClick={() => {
       close();
       setsinglerun(true);
      }}>
      Aizvert
     </button>
    </div>
   </div>
  </>
 );
}

//todo implement  uopload preview and delete from upload

function editfn(poststate, editid) {
 let formdata = new FormData();
 console.log(poststate);
 if (poststate.ieraksti[0].title != poststate.newtitle) {
  formdata.append("title", poststate.newtitle);
 }
 if (poststate.ieraksti[0].pdesc != poststate.newpdesc) {
  formdata.append("pdesc", poststate.newpdesc);
 }
 if (poststate.files != null) {
  for (let i = 0; i < poststate.files.length; i++) {
   formdata.append("file", poststate.files[i]);
   console.log(i);
  }
 }
 formdata.append("replaceflag", "false");
 formdata.append("removeflag", "false");
 formdata.append("idpost", editid);
 console.log(formdata);
 fetch(`http://localhost:3000/api/editpost/`, {
  method: "POST",
  body: formdata,
 })
  .then((response) => response.json())
  .catch((error) => {
   console.error("Error:", error);
  });
}
