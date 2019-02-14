import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpHeaders }
  from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

declare var MiniProfiler: any;

@Injectable()
export class MiniProfilerInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
        tap(evt => {
            if (evt instanceof HttpResponse) {
              if (evt && evt.headers) {
                this.makeMiniProfilerRequests(evt.headers);
              }
            }
          })
    )
  }

  private makeMiniProfilerRequests(headers: HttpHeaders) {
    const miniProfilerHeaders = headers.getAll('x-miniprofiler-ids');

    if (!miniProfilerHeaders) {
      return;
    }

    miniProfilerHeaders.forEach(miniProfilerIdHeaderValue => {
      const ids = JSON.parse(miniProfilerIdHeaderValue) as string[];
      MiniProfiler.fetchResults(ids);
    });

  }
}