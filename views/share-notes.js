const layout = require("./layout");
const moment = require("moment");

module.exports = ({ note }) => {
  return layout({
    content: `
    <div>
       <h1>
      Note
       </h1>
      <div style="margin-bottom:10px; padding:10px; border-radius:10px;box-shadow: 4px 3px 14px -5px rgba(16,16,16,0.6); ">
       <div><b> <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/null/external-Paper-Clip-office-those-icons-lineal-those-icons-3.png"/> ${
         note.title
       }</b></div>
        <small>${moment(note.createdAt).format("DD MMM YYYY HH:mm")}</small>
        <p>${note.body}</p>
        </div>
        ${
          note.type == "Public"
            ? ` <form method="POST">
     
            <label for="dt">Share to :</label>
           
            <input id="dt" name="sharedUser" placeholder="username" >
             
            <button>Share</button>
            </form>`
            : ""
        }
       </div>
       </div>
    </div>
    `,
  });
};
