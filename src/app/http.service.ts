import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class HttpService {
    private API_URL:string = '/';

    constructor(private http: Http) { }

    getData(endPoint:string) {
        return this.http.get(this.API_URL + endPoint)
            .map( (response: Response) => {
                const json = response.json();

                if (json.success) {
                    return json.data;
                }

                return this.handleError(json.error);
            })
            .catch(this.handleError);
    }

    private handleError (error: any) {
        console.log(error.json());

        return Observable.throw(error.json());
    }
}
