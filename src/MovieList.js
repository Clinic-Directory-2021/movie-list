import { LitElement, html, css } from 'lit';
// const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

export class MovieList extends LitElement {
  
  static get properties() {
    return {
      data: { type: Array},
      value: { type: String },
      route: { type: String },
      params: { type: Object },
      query: { type: Object }
    };
  }

  static get styles() {
    return css`
      /* :host {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          color: #1a2b42;
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
          background-color: var(--movie-list-background-color);
        } */
        .search-div{
          display:'flex';
          padding:10px;
        }
      .search-bar{
        width:80%;
        height:35px;
      }
      .item{
        width:300px;
        height:200px;
        margin:10px;
        padding:5px;
        float:left;
        display: flex;
        overflow : hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        cursor:pointer;
        box-shadow: 0 0 10px gray;
        border-radius:5px;
      }
      .image{
        width:30%;
      }
      .desc{
        margin:10px;
      }
      .summary{
        font-size:14px
      }
      .buttonSearch{
        width:15%;
        height:35px;
        background-color:#22bb33;
        border:0;
        cursor:pointer;
      }
    `;
  }


  constructor() {
    super();
    this.data = [];
    this.value = '';
    this.fetchData()
    this.header = html`Modal header`;
    this.content = html`Modal content`;
    this.footer = html`Modal footer`;
    
  }

 


  async fetchData() {
    var response = await fetch("https://api.tvmaze.com/shows")
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      var res = [];
      for(let i in jsonResponse){
        res.push({'name': jsonResponse[i].name,'image':jsonResponse[i].image, 'rating': jsonResponse[i].rating,'summary':jsonResponse[i].summary})
      }
      this.data = res
      console.log(this.data)
      // Object.entries(jsonResponse).forEach(([key,value])=>{
      //   this.data.push({"name":JSON.stringify(value.name)})
      // })
    } else {
      console.log(response.status, response.statusText);
    }
}

onChange (e) {
  this.value = e.srcElement.value
  
}
async onClick(){
  if(this.value == ''){
    this.fetchData()
  }
  else{
  var response = await fetch(`https://api.tvmaze.com/search/shows?q=${this.value}`)
    if (response.status >= 200 && response.status <= 299) {
      const jsonResponse = await response.json();
      var res = [];
      for(let i in jsonResponse){
        res.push({'name': jsonResponse[i].show.name,'image':jsonResponse[i].show.image, 'rating': jsonResponse[i].show.rating,'summary':jsonResponse[i].show.summary})
      }
      this.data = res
      console.log(this.data)
    } else {
      console.log(response.status, response.statusText);
    }
  }
}

  render() {
    return html`
      <div class='search-div'>
        <input type='text' placeholder='Search TV Shows' class='search-bar' @change=${this.onChange}/>
        <button @click=${this.onClick} class="buttonSearch">Search</button>
      </div>
      <div class='items'>
        ${this.data && this.data.map((data, key)=>{
          return html`
           <div class='item'>
              <img src=${data.image && data.image.original} alt='image' class='image'/>
              <div class='desc'>
                <strong><p>${data.name}</p></strong>
                <p>Rating: ${data.rating.average}</p>
                <p class='summary'>${data.summary}</p>
              </div>
          </div>
          <lit-modal open 
               .header = "${this.header}"
               .content = "${this.content}"
               .footer = "${this.footer}"
          ></lit-modal>
          `
        })}

         
      </div>
    `;
  }
}
