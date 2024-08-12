import { useEffect } from "react";
// eslint-disable-next-line react/prop-types
export default function Upload({ CLOSBTN }) {
 // eslint deva prop-types kļūdu funkcijas pogai IDE

 useEffect(() => {
  function upload() {
   let fileupl = document.getElementById("fileupl");
   let preview = document.getElementById("preview");
   if (fileupl.files.length === 0) {
    return;
   }
   let reader = new FileReader();
   reader.onload = function () {
    preview.src = reader.result;
   };
   reader.readAsDataURL(fileupl.files[0]);
  }
  document.getElementById("fileupl").addEventListener("change", upload);
  upload();
  return () => {};
 }, []);

 function onUpload() {
  let fileupl = document.getElementById("fileupl");
  let ptitle = document.getElementById("uploadtitle");
  let pdesc = document.getElementById("uploadpdesc");
  let formdata = new FormData();
  formdata.append("title", ptitle.value);
  formdata.append("pdesc", pdesc.value);
  formdata.append("file", fileupl.files[0]);
  fetch("http://localhost:3000/api/addpost", {
   method: "post",
   body: formdata,
  })
   .then((response) => response.json())
   .catch((error) => {
    console.error("Error:", error);
   });
 }

 return (
  <div className="upload">
   <div>
    <form action="upload" onSubmit={(e) => e.preventDefault()}>
     <h1>Pievienot</h1>
     <p>Ieraksta virsraksts</p>
     <input type="text" id="uploadtitle" placeholder="Ieraksta virsraksts" />
     <p>Ieraksta apraksts</p>
     <input type="text" id="uploadpdesc" placeholder="Ieraksta apraksts" />
     <div>
      <p>Ieraksta attels (var nepievienot)</p>
      <img id="preview" />
      <input id="fileupl" type="file" />
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
