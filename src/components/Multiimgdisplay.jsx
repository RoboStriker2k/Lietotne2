/* eslint-disable react/prop-types */

export default Multiimgdisplay;

function Multiimgdisplay(props) {
  let imgarr=props.imgarr;
let editstatus=props.editstatus;
 let imgurl = "http://localhost:3000/getfoto/";

 return (
  <div id="multiimgdisplay">
   <div id="multiimg">
    {imgarr.images.map((img, index) => (
     <div key = {index}>
      <img src={imgurl + img}  />

      {editstatus ? <input className="multiimgcheck" type="checkbox" id={img} /> : null}
     </div>
    ))}
   </div>
  </div>
 );
}
