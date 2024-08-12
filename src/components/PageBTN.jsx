export default PageBTN;
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
function PageBTN({ maxpages, getcontent }) {
 let [page, setpage] = useState(0);

 useEffect(() => {}, [maxpages, page]);

 return (
  <div id="pagenum">
   <button
    onClick={() => {
     if (page > 0) {
      setpage(page - 1);
      getcontent(page - 1);
     }
    }}>
    Back
   </button>
   <h1>
    {page}/{maxpages}
   </h1>
   <button
    onClick={() => {
     if (page < maxpages) {
      setpage(page + 1);
      getcontent(page + 1);
     }
    }}>
    Next
   </button>
  </div>
 );
}
