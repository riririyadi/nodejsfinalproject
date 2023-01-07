const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `
    <div>
       <h1>
      Create a New Note
       </h1>
       <form style="margin-top:20px" method="POST">
       <label for="title">Title</label>
       <br>
          <input name="title"  id="title" style="width: 100%; margin-bottom: 10px"/>
          <br>
          <label for="body">Body</label>
          <br>
            <textarea name="body" id="body" style="width: 100%; min-height:300px" ></textarea>
            <br>
            <div style="display:flex; flex-direction: row; justify-content: space-between; align-items:center; margin-top:20px">
            <div>
            <label for="dt">Note Type :</label>
            <select id="dt" name="type">
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            <select>
            </div>
            <button>Save</button>
            </div>
            </form>
       </div>
       </div>
    </div>
    `,
  });
};
