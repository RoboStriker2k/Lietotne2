/* eslint-disable react/prop-types */
export default Galleryview;
import { useState, useEffect } from "react";
function Galleryview({ gallery, resetgallery }) {
 let [singlerun, setsinglerun] = useState(true);
 const [gstate, setgstate] = useState({
  IER: [],
  pw: [],
  statenr: -1,
  currimg: "",
  imageindex : 0
 });
 let imgurl = "http://localhost:3000/getfoto/?file=";
 useEffect(() => {
  function getpost() {
   fetch(`http://localhost:3000/api/getpost/?postiid=${gallery.postid}`, {
    method: "GET",
   })
    .then((response) => response.json())
    .then((data) => {
     setgstate({ ...gstate, IER: data.posts[0], statenr: 1, pw: data.posts[0].imgarr, currimg: data.posts[0].imgarr.images[0] });
    })
    .catch((error) => {
     console.log(error);
    });
  }
  if (singlerun && gallery.postid != 0) {
   getpost();
   setsinglerun(false);
  }
 }, [singlerun, gstate, gallery]);
function close () {
 setgstate({ ...gstate, statenr: -1  });
 setsinglerun(true);
 resetgallery();
}
function nextimg () {
    let index= gstate.imageindex
  if (index < gstate.pw.images.length - 1) {
    setgstate({ ...gstate, imageindex : index + 1, currimg: gstate.pw.images[index + 1] });
  }
}
function previmg () {
    let index= gstate.imageindex
  if (index > 0) {
    setgstate({ ...gstate, imageindex : index - 1, currimg: gstate.pw.images[index - 1] });
  }
}
 return (
  <div id="gallerymarker">
   {gstate.statenr == -1 ? null : (
    <div className="gallery">
   
        <div id="galleryimg">
            <img src={imgurl + gstate.currimg} />
        </div>
      <div className="gallerynav">
       <button id="prev" onClick={previmg}>{'<'}</button>
            <div id="currimg"> <img id="currimg" src={imgurl + gstate.currimg} /></div>
       <button id="next" onClick={nextimg}>{'>'}</button>
       <button style ={{ float: "right" }} onClick={close}>iziet</button>
      </div>
       { gstate.IER.imgarr ? (
      <div className="album">
          {gstate.IER.imgarr.images.map((img, index) => (
           <div
            key={index}
            onClick={() => {
             setgstate({
              ...gstate,
              statenr: 1,
              currimg: img,
             });
            }}>
            <img src={imgurl + img} />
           </div>
          ))}
         </div>
       ) : null}
     </div>
   )}
  </div>
 );
}
