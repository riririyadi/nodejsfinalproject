const layout = require("./layout");
const moment = require("moment");

const showData = (array) => {
  if (array.length == 0) {
    return "<div>No data</div>";
  }
  let data = "";
  array.forEach((element) => {
    data += `<div onclick="location.href='/note/${
      element.id
    }'" style="margin-bottom:10px; padding:10px; border-radius:10px;box-shadow: 4px 3px 14px -5px rgba(16,16,16,0.6); ">
           <div><b> <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/null/external-Paper-Clip-office-those-icons-lineal-those-icons-3.png"/> ${
             element.title
           }</b></div>
              <small>${moment(element.createdAt).format(
                "DD MMM YYYY HH:mm"
              )}</small>
               <p>${element.body.slice(0, 200)} ${
      element.body.length > 200
        ? ".... <span style='color:blue'>View more</span>"
        : ""
    }</p>
               <div style="display:flex; justify-content: space-between">
               <small style=${
                 element.type == "Public"
                   ? "background-color:lightblue"
                   : "background-color:lightgreen"
               }>${element.type}</small>
               ${
                 element.type == "Public"
                   ? `<a href='/note/${element.id}'><img src="https://img.icons8.com/external-anggara-basic-outline-anggara-putra/24/null/external-share-communication-anggara-basic-outline-anggara-putra.png" style="width: 15px; height: 15px"/>  share</a>`
                   : ""
               }
               </div>
               </div>
    `;
  });
  return data;
};

const showSharedNotes = (sharedNotes) => {
  const { notes } = sharedNotes;
  if (notes.length == 0) {
    return "<div>No data</div>";
  }
  let data = "";
  notes.forEach((element) => {
    data += `<div style="margin-bottom:10px;padding:10px; border-radius:10px;box-shadow: 4px 3px 14px -5px rgba(16,16,16,0.6);;">
              <div><b> <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/null/external-Paper-Clip-office-those-icons-lineal-those-icons-3.png"/> ${
                element.title
              }</b></div>
               <small>${moment(element.createdAt).format(
                 "DD MMM YYYY HH:mm"
               )}</small>
               <p>${element.body.slice(0, 200)} ${
                element.body.length > 200
                  ? ".... <span style='color:blue'>View more</span>"
                  : ""
              }</p>
               <small>Shared by ${element.user.username}</small>
               </div>
    `;
  });
  return data;
};

module.exports = ({ data, user, sharedNotes }) => {
  return layout({
    content: `
    <div>
    <div style="display:flex; flex-direction:row; align-items:center; justify-content:space-between">
      <div>
      <h1>
      Hello, ${user.username}
      </h1>
      
      </div>
      <div style="display:flex; flex-direction:row; align-items:center;"><button><a href='/logout'  style="text-decoration:none">Sign Out  <img src="https://img.icons8.com/pastel-glyph/64/null/login-rounded-right.png"  style="width: 15px; height: 15px; margin-left:5px"/></a></button></div>
    </div>
       <div>
       <div><button><a href="/create-notes" style="text-decoration:none">Create a new note <img src="https://img.icons8.com/fluency-systems-regular/48/null/pencil--v1.png" style="width: 15px; height: 15px"/></a></button></div>
       <div>
            <h3>My Notes</h3>
              <div>
                ${showData(data)}
                </div>
        </div>
        <div>
           <h3>Shared Notes</h3>

        <div>
         ${showSharedNotes(sharedNotes)}
         </div>
         </div>
       </div>
    </div>
    `,
  });
};
