import {Component, OnInit} from '@angular/core';
import {CRUDService, Contact, ContactsMockService, ContactsService} from '../../services/app.dataservice';
import { Observable } from 'rxjs';

@Component({
  selector: 'pointer-panel-workspace',
  templateUrl: './pointer-panel-workspace.html',
  styleUrls: ['./pointer-panel-workspace.scss']
})
export class PointerPanelWorkspace implements OnInit {

 uniqueId = 0;
 cards$: Observable<Contact[]>;

  constructor(public contactsService: ContactsService ) { 


  }

  goToDoc(){
    window.open("https://github.com/antsebastian/mgui-controls/wiki/mgui-pointer-panel", "_blank");
}

  addCard() {

    const icm = new Contact();
    icm.avatarFileName = '../assets/starwars/hanssolo_a.jpg';
    icm.largeAvatarFileName = '../assets/starwars/hanssolo.jpg'

    icm.largeDescription = 'Test pointer position when adding a new card. ' +
                            'The card should position itself correctly around the pointer panel.';
    icm.firstName = 'Card ' + this.uniqueId++;
    icm.description = 'Test pointer position';

    this.contactsService.addItem(icm);
  }

  onDeleteCard(card) {
    console.log('delete');
    this.contactsService.deleteItem(card);
  }

  ngOnInit(): void {
    this.cards$ = this.contactsService.getItems();
  }
}
