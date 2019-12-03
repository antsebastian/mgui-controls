import {Component, OnInit, Input} from '@angular/core';
import {CRUDService, Game, GamesMockService, GamesService} from '../../services/app.dataservice';

@Component({
  selector: 'sportsbook-workspace',
  templateUrl: './sportsbook-workspace.html',
  styleUrls: ['./sportsbook-workspace.scss']
})
export class SportsbookWorkspace implements OnInit {

 uniqueId = 0;
 games$;
 sportCategory='football';

  constructor(public gameService: GamesService) { }

  onSportsCategoryChanged($event){
    this.sportCategory = $event.value;
  }

  ngOnInit(): void {
    this.games$ = this.gameService.getItems();
  }
}
