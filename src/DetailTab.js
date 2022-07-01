import { LitElement, html, css } from 'lit';

export class DetailTab extends LitElement {
  
    static get properties() {
      return {
        data: { type: Array},
        value: { type: String },
      };
    }

    render(){
        return html`
        <h1>Hello</h1>
        `
    }
}