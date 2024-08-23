import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
export default function Upload({ CLOSBTN }) {
 const [uploadstate, setuploadstate] = useState({
  title: "Ieraksta virsraksts",
  pdesc: "Ieraksta apraksts",
  files: [],
  preview: [],
  statenr: 0,
 });

 useEffect(() => {
  if (uploadstate.statenr > 0) {
   setTimeout(() => {
    setuploadstate({ ...uploadstate, statenr: uploadstate.statenr - 1 });
   }, 100);
  }
 }, [uploadstate]);

 function onUpload() {
  let formdata = new FormData();
  formdata.append("title", uploadstate.title);
  formdata.append("pdesc", uploadstate.pdesc);
  if (uploadstate.files != null) {
   for (let i = 0; i < uploadstate.files.length; i++) {
    formdata.append("file", uploadstate.files[i]);
   }
  }
  fetch("http://localhost:3000/api/addpost", {
   method: "post",
   body: formdata,
  })
   .then((response) => response.json())
   .then(() => {
    setuploadstate({
     title: "Ieraksta virsraksts",
     pdesc: "Ieraksta apraksts",
     files: [],
     preview: [],
     statenr: 3,
    });
   })
   .catch((error) => {
    console.error("Error:", error);
   });
 }

 function onMultipleFilesSelected(event) {
  let filearr = [];
  for (let i = 0; i < event.target.files.length; i++) {
   filearr.push(event.target.files[i]);
   renderpic(event.target.files[i]);
  }
  setuploadstate({ ...uploadstate, files: filearr, statenr: 1 });
 }

 function removefromupload(fileindex) {
  let pics = uploadstate.preview;
  let filearr = uploadstate.files;
  if (fileindex != -1) {
   pics.splice(fileindex, 1);
  }
  if (uploadstate.files != null) {
   if (fileindex != -1) {
    filearr.splice(fileindex, 1);
   }
  }
  setuploadstate({ ...uploadstate, files: filearr, preview: pics, statenr: 1 });
 }
 function renderpic(img) {
  let imgarr = uploadstate.preview;
  const reader = new FileReader();
  reader.onload = (e) => {
   if (e.target) {
    imgarr.push(e.target.result) ?? "";
   }
  };
  reader.readAsDataURL(img);
  setuploadstate({ ...uploadstate, preview: imgarr, statenr: 1 });
 }

 return (
  <div className="upload">
   <div id={uploadstate.statenr}>
    <form action="upload" onSubmit={(e) => e.preventDefault()}>
     <h1>Pievienot</h1>
     <p>Ieraksta virsraksts</p>
     <input
      type="text"
      id="uploadtitle"
      placeholder={uploadstate.title}
      onChange={(e) => setuploadstate({ ...uploadstate, title: e.target.value })}
     />
     <p>Ieraksta apraksts</p>
     <input
      type="text"
      id="uploadpdesc"
      placeholder={uploadstate.pdesc}
      onChange={(e) => setuploadstate({ ...uploadstate, pdesc: e.target.value })}
     />
     <div>
     <p>Ieraksta attels -li (var arī nepievienot)</p>
      <input id="fileupl" multiple type="file" onChange={(e) => onMultipleFilesSelected(e)} />
     </div>
     <div>
      {uploadstate.preview.map((previewimg, index) => (
       <div className="editgrid" key={index}>
        <img id="preview" src={previewimg} />
        <button className="removebtn" type="button" onClick={() => removefromupload(index)}>
         X
        </button>
       </div>
      ))}
     </div>
     <div>
      <button onClick={onUpload}>Upload</button>
      <button onClick={CLOSBTN}>Aizvert</button>
     </div>
    </form>
   </div>
  </div>
 );
}
