import { Component, OnInit, OnDestroy} from '@angular/core';
import {adDispatcher, IAdEvent, IAdEventData, MAP_WIDTH, MAP_HEIGHT} from '../ad-dispatcher';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'markerAds' })
export class MarkerAdsPipe implements PipeTransform {
    transform(allAds: IAdEventData[]) {
        const filtered = allAds.filter(ad => ad.show);
        console.log('filtered', filtered);
        return filtered;
    }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ubimo-fed-ha-irit';
  adSubscriber = null;
  adList: IAdEventData[] = [];
  markerAdList: IAdEventData[] = [];
    mapWidth = MAP_WIDTH;
    mapHeight = MAP_HEIGHT;

    constructor() {}
    start() {
        if (this.adSubscriber == null) {
            const cb = (adEvent: IAdEvent) => {
                const ed: IAdEventData = adEvent as IAdEventData;
                ed.time = Date.now();
                ed.show =  true;
                // Insert date descending
                this.adList.unshift(ed);
                this.markerAdList.push(ed);
                setTimeout(() => {
                    ed.show = false;
                    // Filter ads for map
                    this.markerAdList = this.markerAdList.filter(ad => ad.show);
                }, 10000);
            };
            this.adSubscriber = adDispatcher.registerToAdEvents(cb);
            adDispatcher.startEmissions();
        }
    }
    stop() {
        if (this.adSubscriber) {
            this.adSubscriber.removeListener();
            this.adSubscriber = null;
        }
    }
    ngOnInit() {
       this.start();
    }
    ngOnDestroy() {
        this.stop();
    }
}
