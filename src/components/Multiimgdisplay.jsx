/* eslint-disable react/prop-types */

export default Multiimgdisplay;

function Multiimgdisplay(props) {
  let imgarr=props.imgarr;
let editstatus=props.editstatus;
 let imgurl = "http://"+window.location.hostname+":3000/getfoto/?file=";

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
