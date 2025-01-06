import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomResponse } from '../interface/customer-response';
import { Server } from '../interface/server';
import { Status } from '../enum/status.enum';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private readonly url = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  getServers(): Observable<CustomResponse> {
    return this.http
      .get<CustomResponse>(`${this.url}/server/list`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  saveServer(server: Server): Observable<CustomResponse> {
    return this.http
      .post<CustomResponse>(`${this.url}/server/save`, server)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  pingServer(ipAddress: string): Observable<CustomResponse> {
    return this.http
      .get<CustomResponse>(`${this.url}/server/ping/${ipAddress}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  filterServer(
    status: Status,
    response: CustomResponse
  ): Observable<CustomResponse> {
    return new Observable<CustomResponse>((subscriber) => {
      console.log(response);

      const filteredServers =
        response.data.servers?.filter((server) => server.status === status) ||
        [];

      const updatedResponse: CustomResponse =
        status === Status.ALL
          ? {
              ...response,
              message: `Servers filtered by ALL status`,
            }
          : {
              ...response,
              message:
                filteredServers.length > 0
                  ? `Servers filtered by ${
                      status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN'
                    } status`
                  : `No servers found`,
              data: {
                servers: filteredServers,
              },
            };

      subscriber.next(updatedResponse);
      subscriber.complete();
    }).pipe(tap(console.log), catchError(this.handleError));
  }

  deleteServer(serverId: number): Observable<CustomResponse> {
    return this.http
      .delete<CustomResponse>(`${this.url}/server/delete/${serverId}`)
      .pipe(tap(console.log), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError('Method not implemented.');
  }
}
