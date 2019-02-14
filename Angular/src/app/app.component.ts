import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private src: string = 'http://localhost:5000/mini-profiler-resources/';
  private scriptSrc: string = `${this.src}includes.min.js`;
  private cssSrc: string = `${this.src}includes.min.css`;

  private id: string = 'mini-profiler';
  private dataPath: string = `${this.src}`;
  private dataVersion: string = '';
  private dataPosition: string = 'right';
  private dataChildren: boolean = true;
  private dataMaxTraces: number = 35;
  private dataAuthorized: boolean = true;
  private dataStartHidden: string = 'false';
  private dataToggleShortcut: string = 'Alt+P';
  private dataTrivialMilliseconds: number = 35;
  private dataTrivial: boolean = true;
  private dataControls: boolean = true;
  private dataCurrentId: string = '';
  private dataIds: string = '';
  private scriptAsync: boolean = true;
  private innerHTML: string = '';

  constructor(private http: HttpClient){
  }

  ngAfterViewInit(): void {
    //添加Miniprofier的js
    this.appendDivElement();
    //添加Miniprofier的css
    this.appendCssLink();
  }

  //请求后台接口
  send(): void{
    let serverurl: string = "http://localhost:5000//api/Values";

    this.http.get(serverurl)
    .toPromise()
    .then(response => {
      console.log()
    }).catch(error => {
    });
  }

  private appendDivElement(): void {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = this.innerHTML;
    script.src = this.scriptSrc;
    script.setAttribute('data-version', this.dataVersion);
    script.setAttribute('data-path', this.dataPath);
    script.setAttribute('data-position', this.dataPosition);
    script.setAttribute('id', this.id);
    script.setAttribute('data-current-id', this.dataCurrentId);
    script.setAttribute('data-ids', this.dataIds);
    script.setAttribute('data-trivial', this.dataTrivial.toString());
    script.setAttribute('data-children', this.dataChildren.toString());
    script.setAttribute('data-max-traces', this.dataMaxTraces.toString());
    script.setAttribute('data-controls', this.dataControls.toString());
    script.setAttribute('data-authorized', this.dataAuthorized.toString());
    script.setAttribute('data-start-hidden', this.dataStartHidden.toString());
    script.setAttribute('data-toggle-shortcut', this.dataToggleShortcut);
    script.setAttribute('data-trivial-milliseconds', this.dataTrivialMilliseconds.toString());
    script.async = this.scriptAsync;
    body.appendChild(script);
  }

  private appendCssLink(): void {
      const body = document.body as HTMLDivElement;
      const css = document.createElement('link');
      css.href = this.cssSrc;
      css.rel = 'stylesheet';

      body.appendChild(css);
  }
}
