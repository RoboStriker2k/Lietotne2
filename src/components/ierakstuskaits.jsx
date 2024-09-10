import { useEffect, useState } from "react";

export default Ierakstuskaits;

function Ierakstuskaits() {
  const [postcount, setpostcount] = useState(0);

  useEffect(() => {
    function fetchdata() {
      fetch(`http://localhost:3000/api/postscount/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setpostcount(data.posts[0].postscount);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="postcntbox">
       <p>Kopējais ierakstu skaits datubāze:</p>
      <p id="postcount">{postcount}</p>
    </div>
  );
}
