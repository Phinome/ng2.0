import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Hero } from './hero'

@Injectable()
export class HeroSearchService {
    private url = 'http://localhost:8888/search'
    constructor(private http: Http) {}

    search(term: String): Observable<Hero[]> {
        return this.http
            .get(`${this.url}?name=${term}`)
            .map((r: Response) => r.json() as Hero[]);
    }
}