import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  imports: [],
  template: `
    <h3>Comentarios de lo que sea</h3>
    <img src="https://img.rtve.es/imagenes/this-is-fine-meme-forma-parte-webcomic-2013/1614352806474.png" alt="This is fine meme" />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi voluptatum blanditiis dicta assumenda in fugiat molestiae illo deleniti aperiam magni ad nostrum, nesciunt recusandae. Aliquid consequatur est deserunt mollitia fugit.</p>
  `,
  styles: `
  img{
    width: 25%;
    height: auto;
  }`
})
export class CommentsComponent {

}
