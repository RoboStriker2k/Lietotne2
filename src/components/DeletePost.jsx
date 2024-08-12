export function DeletePost() {
 let selectledelate = document.querySelectorAll("input[type=checkbox]:checked");
 if (selectledelate.length === 0) {
  return;
 } else {
  let deleteselection = [];
  for (let i = 0; i < selectledelate.length; i++) {
   document.getElementById(selectledelate[i].id).children[0].checked = false;
   if (deleteselection.includes(selectledelate[i].id)) {
    continue;
   } else {
    deleteselection.push(selectledelate[i].id);
   }
  }

  let deleteform = new FormData();
  if (deleteselection.length > 1) {
   for (let i = 0; i < deleteselection.length; i++) {
    deleteform.append("idlist", deleteselection[i]);
    console.log("added" + deleteselection[i]);
   }
  } else if (deleteselection.length == 1) {
   deleteform.append("idlist", deleteselection[0]);
  }

  fetch("http://localhost:3000/api/deleteposts", {
   method: "post",
   body: deleteform,
  })
   .then((response) => response.json())
   .catch((error) => {
    console.error("Error:", error);
   });
 }
}
